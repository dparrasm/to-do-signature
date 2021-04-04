import express from 'express';
const router = express.Router();
import {check, validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

// @route   POST api/users
// @desc    Register an user
// @access  Public

const User = require('../../models/User');

router.post(
    '/', 
    [
        check('name','Name is required')
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 4 or more characters'
        ).isLength({ min: 4 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, surname, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if(user) {
               return res.status(400).json({ errors: [{msg: 'User already exists'}]});
            }
            
            user = new User({
                name,
                surname,
                email,
                password
            });
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);
            
            await user.save();
            
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtToken'),
                { expiresIn : 360000},
                //Returns either an error, either the token.
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            )
            res.send('User registered ');
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }       
});

module.exports = router;