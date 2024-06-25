const express = require('express');
const router = express.Router();
const Person = require('./../Models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt')


router.post('/signup', async (req,res) => {
    try {
      const data = req.body;
  
      const newPerson = new Person(data);
    
      const response = await newPerson.save();
      console.log('person data saved');

      const payload = {
        id: response.id,
        username: response.username,
      }
      const token = generateToken(payload);
      res.status(201).json({response: response, token: token});
    } catch (err) {
      console.log('error');
      res.status(400).json({ message: err.message });
    }
  });
  
  //login Route
  router.post('/login', async(req,res) => {
    try {
      // Extract username and password from request body
      const {username, password} = req.body;

      //find the user by username
      const user = await Person.findOne({username:  username});

      //If user does not exist or password does not match, return error
      if(!user || !(await user.comparePassword(password))) {
        return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token

      const payload = {
        id: user.id,
        username: user.username
      }
      const token = generateToken(payload);

      res.json({token})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  
  router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    } catch (error) {
      console.log('error');
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
      const userData = req.user;
      console.log("userData", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);
      res.status(200).json({user});
    } catch (error) {
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