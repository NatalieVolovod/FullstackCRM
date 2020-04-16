const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        // user found, check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult) {
            // generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60}); // expires in an hour

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            // wrong password
            res.status(401).json({
                message: 'Wrong password, try again'
            });
        }
    } else {
        // user not found, error
        res.status(404).json({
            message: 'User with this email not found!'
        })
    }

}

module.exports.registrate = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        // user found, sending back an error
        res.status(409).json({
            message: 'Account with this email already exists. Try another one or login.'
        })
    } else {
        // crypting password
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        // creating new user
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try{
            await user.save();
            res.status(201).json(user);
        } catch(e) {
            // work with error
        }
    }
}