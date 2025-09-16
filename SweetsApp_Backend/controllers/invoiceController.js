const Invoice = require('../models/Invoice');
const Mithai = require('../models/Mithai');
const Purchase = require('../models/Purchase');
const User = require('../models/User');

const getUserInvoices = async (req, res) => {
  const userId = req?.user?.id || 1; 
  try {
    const invoices = await Invoice.findAll({ where: { userId } });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInvoiceById = async (req, res) => {
    const userId = req?.user?.id || 1; 
    const { id } = req.params;
  
    try {
      const invoice = await Invoice.findOne({ where: { id, userId } });
  
      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
  
      const purchases = await Purchase.findAll({ where: { invoiceId: id } });

      purchases.forEach((p) => console.log(p.get()))      
  
      const purchasedItems = await Promise.all(purchases.map(async (purchase) => {
        const mithai = await Mithai.findByPk(purchase.mithaiId);
        
        return {
          name: mithai.name,
          quantity: purchase.quantity,
          totalValue: purchase.totalAmount,
          weight: purchase.weight
        };
      }));
    
      res.status(200).json({
        invoiceData: {
          ...invoice.get(), 
          purchasedItems
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = { getUserInvoices, getInvoiceById };
