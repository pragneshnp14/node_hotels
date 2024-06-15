const express = require('express');
const router = express.Router();
const MenuItem = require('../Models/MenuItem');


router.post('/', async (req,res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log('Menu data saved');
    res.status(201).json(response);
  } catch (err) {
    console.log('error');
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log('error');
    res.status(500).json({ message: error.message });
  }
});

router.get('/:taste', async (req, res) =>{
  try {
    const taste = req.params.taste;
    if(taste == 'sweet' || taste == 'spicy' || taste == 'sour') {
      const response = await MenuItem.find({taste: taste});
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Taste" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) =>{
  try {
      const menuId = req.params.id;
      const updatedMenuData = req.body;
      const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
          new: true,
          runValidators: true
      });

      if(!response) {
          res.status(404).json({ error: "Menu Item not found" });
      }
      console.log('data updated');
      res.status(200).json(response);
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) =>{
  try {
      const menuId = req.params.id;
      const response = await MenuItem.findByIdAndDelete(menuId);

      if(!response) {
          res.status(404).json({ error: "Menu item not found" });
      }
      console.log('data deleted');
      res.status(200).json({message: "Menu item deleted successfully"});
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;