const Mithai = require('../models/Mithai');
const Purchase = require('../models/Purchase');
const Invoice = require('../models/Invoice');
const User = require('../models/User');

const WEIGHT_CONSTANT = 10*1000;

const weightInGrams = (weight) => {
  switch (weight) {
    case '250g': return 250;
    case '500g': return 500;
    case '1000g': return 1000;
    case '2000g': return 2000;
    default: return 0;
  }
};

const buyMithai = async (req, res) => {
  const userId = req?.user?.id || 1; 
  const { mithaiItems } = req.body; 
  
  try {
    let totalWeight = 0;
    let totalAmount = 0;

    for (const item of mithaiItems) {
      const { mithaiId, quantity, weight } = item;
      
      const mithai = await Mithai.findByPk(mithaiId);
      if (!mithai) {
        return res.status(404).json({ error: `Mithai with ID ${mithaiId} not found` });
      }

      const mithaiWeight = weightInGrams(weight) * quantity;
      totalWeight += mithaiWeight;

      let availableStock;
      switch (weight) {
        case '250g': availableStock = mithai.availableQuantity250g; break;
        case '500g': availableStock = mithai.availableQuantity500g; break;
        case '1000g': availableStock = mithai.availableQuantity1000g; break;
        case '2000g': availableStock = mithai.availableQuantity2000g; break;
        default: return res.status(400).json({ error: 'Invalid weight' });
      }

      if (quantity > availableStock) {
      
        return res.status(400).json({ error: `Not enough stock for ${mithai.name} at ${weight}` });
      }
      totalAmount += ((mithai.rate * mithaiWeight)/1000);      
    }

    if (totalWeight > WEIGHT_CONSTANT) {
      return res.status(400).json({ error: 'Total weight of all mithai items cannot exceed 5kg' });
    }

    const invoiceNumber = `INV-${Date.now()}`;
    const invoice = await Invoice.create({
      invoiceNumber,
      totalAmount,
      totalWeight,
      userId
    });
    for (const item of mithaiItems) {
      const { mithaiId, quantity, weight } = item;

      const mithai = await Mithai.findByPk(mithaiId);

      switch (weight) {
        case '250g': mithai.availableQuantity250g -= quantity; break;
        case '500g': mithai.availableQuantity500g -= quantity; break;
        case '1000g': mithai.availableQuantity1000g -= quantity; break;
        case '2000g': mithai.availableQuantity2000g -= quantity; break;
      }

      const weight_enums = {
        '250g': 250,
        '500g': 500,
        '1000g': 1000,
        '2000g': 2000
      }

      await mithai.save();

      await Purchase.create({
        mithaiId,
        quantity,
        weight,
        totalAmount: (mithai.rate * quantity * weight_enums[weight] )/1000,
        invoiceId: invoice.id
      });
    }

    res.status(201).json({ message: 'Mithai purchased successfully', invoice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { buyMithai };
