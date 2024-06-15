const express = require('express');
const router = express.Router();
const Person = require('./../Models/Person');


router.post('/', async (req,res) => {
    try {
      const data = req.body;
  
      const newPerson = new Person(data);
    
      const response = await newPerson.save();
      console.log('person data saved');
      res.status(201).json(response);
    } catch (err) {
      console.log('error');
      res.status(400).json({ message: err.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    } catch (error) {
      console.log('error');
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/:workType', async (req, res) =>{
    try {
      const workType = req.params.workType;
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
        const response = await Person.find({work: workType});
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: "Invalid Work Type" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put('/:id', async (req, res) =>{
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        });

        if(!response) {
            res.status(404).json({ error: "Person not found" });
        }
        console.log('data updated');
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

  router.delete('/:id', async (req, res) =>{
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response) {
            res.status(404).json({ error: "Person not found" });
        }
        console.log('data deleted');
        res.status(200).json({message: "Person deleted successfully"});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;