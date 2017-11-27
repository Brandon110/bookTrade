const express = require('express');
const books = require('google-books-search');
const userModel = require('../models/userModel.js');
const mongoose = require('mongoose');
const checkAuth = require('./checkAuth');
const app  = express();

module.exports = function(app) {
app.post('/add/book/:title', checkAuth, (req, res) => {
    const bookTitle = req.params.title;
 
    const options = {
        key: process.env.API_KEY,
        feild: 'title',
        offset: 0,
        limit: 1,
        type: 'books',
        order: 'relevance',
        lang: 'en'
    }

    books.search(bookTitle, options, function(err, results) {
        if (err) return err;

        results.forEach(result => {
            const data = new userModel({
                bookData: {
                    id: result.id,
                    title: result.title,
                    owner: req.session.user.email,
                    thumbnail: result.thumbnail
                }
            });

            data.save(err => {
                if (err) return err;

                res.send('success');
            });
        });
    });
});

app.post('/remove/book/:id', checkAuth, (req, res) => {
            userModel.remove({ '_id': req.params.id }, (err, result) => {
                if (err) return err;
                res.send(result);
            });
});

app.post('/accept/trade/requests', (req, res) => {
    userModel.findOneAndUpdate({ '_id': req.body.id }, {
        $set: {
            'tradeRequest.accepted': true
        }
    }, { new: true }, (err, obj) => {
        if (err) return err;
        res.send('success');
    });
});

app.post('/cancel/trade/request/:id', (req, res) => {
    userModel.findOneAndUpdate({ '_id': req.params.id }, {
        $set: {
            'bookData.requested_to_trade': false,
            'tradeRequest.accepted': false,
            'tradeRequest.id': '',
            'tradeRequest.title': '',
            'tradeRequest.myEmail': '',
            'tradeRequest.requestedEmail': ''
        }
    }, { new: true }, (err, updated) => {
        if (err) return err;

        res.json(updated);
    });
});
}