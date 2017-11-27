const express = require('express');
const userModel = require('../models/userModel.js');
const mongoose = require('mongoose');
const checkAuth = require('./checkAuth');
const bcrypt = require('bcrypt');
const app  = express();

module.exports = function(app) {
    app.post('/update/settings', (req, res) => {
    userModel.findOneAndUpdate({ 'email': req.session.user.email }, {
        $set: {
            'accountSettings.state': req.body.state,
            'accountSettings.city': req.body.city
        }
    }, { new: true }, (err, user) => {
        if (err) return err;

        res.send('success');
    });
});

app.post('/change/password', (req, res) => {
    const saltRounds = 10;

    userModel.findOne({ 'email': req.session.user.email }, (err, user) => {
        if (err) return err;

        const checkIfPasswordMatchesHash = () => {
            bcrypt.compare(req.body.current_password, user.password).then(function(result) {
                if (result === false) {
                    res.send('error: incorrect password')
                }
                else {
                    changePassword();
                }
            });
        }
        checkIfPasswordMatchesHash();

        const changePassword = () => {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                if (err) return err;
                bcrypt.hash(req.body.new_password, salt, function(err, hash) {
                    if (err) return err;
                    userModel.findOneAndUpdate({ 'email': user.email }, {
                            $set: {
                                'password': hash
                            }
                        },
                        (err, updated) => {
                            if (err) return err;

                            res.redirect('/settings');
                        });
                });
            });
        }
    });
});
}