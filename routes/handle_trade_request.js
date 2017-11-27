const express = require('express');
const userModel = require('../models/userModel.js');
const mongoose = require('mongoose');
const app = express();

module.exports = function(app) {
    app.post('/trade/request/:_id/by/user/:email', (req, res) => {
        const id = req.params._id;

        userModel.findOne({ '_id': id }, (err, obj) => {
            if (err) return err;

            userModel.findOneAndUpdate({ '_id': obj._id }, {
                $set: {
                    'bookData.requested_to_trade': true,
                    'tradeRequest.id': obj._id,
                    'tradeRequest.title': obj.bookData.title,
                    'tradeRequest.myEmail': req.session.user.email,
                    'tradeRequest.requestedEmail': req.params.email
                }
            }, { new: true }, (err, updated) => {
                if (err) return err;

                res.json(updated);
            });
        });
    });

    app.get('/current/unapproved-sent/requests', (req, res) => {
        userModel.find({
                'tradeRequest.myEmail': req.session.user.email,
                'tradeRequest.accepted': false
            },
            'tradeRequest',
            (err, data) => {
                if (err) return err;

                res.json(data);
            });
    });

    app.get('/current/approved-sent/trades', (req, res) => {
        userModel.find({
                'tradeRequest.myEmail': req.session.user.email,
                'tradeRequest.accepted': true
            },
            'tradeRequest',
            (err, data) => {
                if (err) return err;

                res.json(data);
            });
    });

    app.get('/current/unapproved/trades', (req, res) => {
        userModel.find({
                'tradeRequest.requestedEmail': req.session.user.email,
                'tradeRequest.accepted': false
            },
            'tradeRequest',
            (err, data) => {
                if (err) return err;

                res.json(data);
            });
    });

    app.get('/current/approved-incoming/trades', (req, res) => {
        userModel.find({
                'tradeRequest.requestedEmail': req.session.user.email,
                'tradeRequest.accepted': true
            },
            'tradeRequest',
            (err, data) => {
                if (err) return err;

                res.json(data);
            });
    });
}
