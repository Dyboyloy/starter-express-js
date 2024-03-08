const express = require('express');
const router = express.Router();
const userModel = require('../Model/UserModel')
const bcrypt = require('bcrypt');
require('../DB/database')

router.get('/', async (req, res) => {
    const user = await userModel.find();
    res.json(user);
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    userModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json('Success')
            } else {
                res.json('the password is incorrect')
            }
        }
    })
    res.status(206).end();
});

router.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const user = new userModel(data);
    user.save();
    res.json(user);
    res.status(201).end();
});

router.patch('/:id', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    await userModel.findOneAndUpdate({_id: req.params.id}, data);
    const userUpdate = await userModel.findById(req.params.id);
    res.json(userUpdate);
});

router.delete('/:id', async (req, res) => {
    await userModel.findOneAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = router;