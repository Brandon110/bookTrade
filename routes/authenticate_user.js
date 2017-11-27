const express = require('express');
const userModel = require('../models/userModel.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app  = express();

module.exports = function(app) {
    const checkIfValidEmailAddress = (email) => {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return re.test(email);
}

app.post('/register/user', (req, res) => {
    const name = req.body.name;
    const email = req.body.username;
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;

    if (checkIfValidEmailAddress(email) === false) {
        res.send('invalid email');
        return false;
    }

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return err;
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            if (err) return err;

            const data = new userModel({
                name: name,
                email: email,
                password: hash
            });

            userModel.findOne({ 'email': data.email }, (err, user) => {
                if (err) return err;

                if (!user) {
                    data.save(function(err, data) {
                        if (err) return err;

                        res.send('success');
                    });
                }
                else {
                    res.send('user exists');
                }
            });
        });
    });
});

app.post('/login/user', (req, res) => {
    const email = req.body.username;
 
    userModel.findOne({ 'email': email }, (err, user) => {
        if (err) return err;

        const checkIfPasswordMatchesHash = () => {
            bcrypt.compare(req.body.password, user.password).then(function(result) {
                if (result === false) {
                    res.send('incorrect password');
                }
                else {
                    req.session.user = {
                        email: user.email
                    }
                    res.send('success');
                }
            });
        }
        
        if (!user) {
            res.send('invalid user');
            return false;
        }
        else {
            checkIfPasswordMatchesHash();
        }
    });
});
 
app.get('/logout/user', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    }
    else {
        res.redirect('/');
    }
});
}