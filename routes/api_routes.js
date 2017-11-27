const express = require('express');
const userModel = require('../models/userModel.js');
const mongoose = require('mongoose');
const app  = express();

module.exports = function(app) {
    app.get('/user', (req, res) => {
    res.json(req.session.user);
});

app.get('/api/all-data', (req, res) => {
    userModel.find({ 'bookData.title': { $exists: true } },
        'bookData').sort({'bookData.requested_to_trade': 1}).exec(
        (err, obj) => {
            if (err) return err;

            res.json(obj);
        });
});

app.get('/api/my-books', (req, res) => {
    userModel.find({ 'bookData.owner': req.session.user.email }, (err, userCollections) => {
        if (err) return err;

        res.json(userCollections);
    });
});

app.get('/user/settings', (req, res) => {
    userModel.findOne({ 'email': req.session.user.email },
        'accountSettings',
        (err, user) => {
            if (err) return err;

            res.json(user);
        });
});
}