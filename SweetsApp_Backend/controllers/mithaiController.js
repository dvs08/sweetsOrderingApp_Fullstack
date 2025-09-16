const Mithai = require('../models/Mithai');

const createMithai = async (req, res) => {
  try {
    const { name, 
            rate, 
            availableQuantity250g, 
            availableQuantity500g, 
            availableQuantity1000g, 
            availableQuantity2000g, 
            image 
          } = req.body;
          
    const mithai = await Mithai.create({
      name,
      rate,
      availableQuantity250g,
      availableQuantity500g,
      availableQuantity1000g,
      availableQuantity2000g,
      image
    });
    res.status(201).json(mithai);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllMithai = async (req, res) => {
  try {
    const mithaiList = await Mithai.findAll();
    res.status(200).json(mithaiList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMithaiById = async (req, res) => {
  try {
    const { id } = req.params;
    const mithai = await Mithai.findByPk(id);
    if (mithai) {
      res.status(200).json(mithai);
    } else {
      res.status(404).json({ error: 'Mithai not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMithai = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rate, availableQuantity250g, availableQuantity500g, availableQuantity1000g, availableQuantity2000g, image } = req.body;
    
    const mithai = await Mithai.findByPk(id);
    if (mithai) {
      mithai.name = name || mithai.name;
      mithai.rate = rate || mithai.rate;
      mithai.availableQuantity250g = availableQuantity250g ?? mithai.availableQuantity250g;
      mithai.availableQuantity500g = availableQuantity500g ?? mithai.availableQuantity500g;
      mithai.availableQuantity1000g = availableQuantity1000g ?? mithai.availableQuantity1000g;
      mithai.availableQuantity2000g = availableQuantity2000g ?? mithai.availableQuantity2000g;
      mithai.image = image || mithai.image;
      await mithai.save();
      res.status(200).json(mithai);
    } else {
      res.status(404).json({ error: 'Mithai not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMithai = async (req, res) => {
  try {
    const { id } = req.params;
    const mithai = await Mithai.findByPk(id);
    if (mithai) {
      await mithai.destroy();
      res.status(200).json({ message: 'Mithai deleted successfully' });
    } else {
      res.status(404).json({ error: 'Mithai not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMithai,
  getAllMithai,
  getMithaiById,
  updateMithai,
  deleteMithai
};
