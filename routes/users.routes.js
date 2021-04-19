const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const moment = require('moment');
const jwt = require('jwt-simple');
const { check, validationResult } = require('express-validator');
const { secretFrase } = require('../config')

// MODEL
const User = require('../database/models/User');

// CREATE
router.post('/register',[
    check('username', 'username can not be empty').not().isEmpty(),
    check('password', 'password can not be empty').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }

    const checkUserNameExist = await User.findOne({ where: {username: req.body.username} })
    if(!checkUserNameExist){
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        let newUser = await User.create(req.body)
        res.status(201).json({newUser: newUser, token: createToken(newUser)})
    
    }else{
        res.status(400).json({msg: 'Username already used, please use another username'})
    }
})

// LOGIN
router.post('/login',[
    check('username', 'username can not be empty').not().isEmpty(),
    check('password', 'password can not be empty').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    const user = await User.findOne({ where: { username: req.body.username }})

    if(user){
        const iguales = bcrypt.compareSync(req.body.password, user.password);
        if(iguales){
            res.status(202).json({ token: createToken(user) })
        }else{
            res.status(401).json({msg: 'Contraseña invalida'})
        }
    }else{
        res.status(401).json({msg: 'Error en el logueo'})
    }
})

// CREATE TOKEN 
const createToken = (user) => {
    const payload = {
        username: user.username,
        createdAt: moment().unix(),
        expiredAt: moment().add(60, 'minutes').unix()
    }
    return jwt.encode(payload, secretFrase);
}

module.exports = router;