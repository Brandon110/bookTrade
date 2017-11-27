const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);
const cookieParser = require('cookie-parser');
const checkAuth = require('./routes/checkAuth');

require('dotenv').config();

mongoose.connection.openUri(process.env.MONGODB_URI || 'mongodb://localhost/userModels');
 
const app = express();

app.set('view engine', 'html');
app.engine('html', (path, options, callback) => {
    fs.readFile(path, 'utf-8', callback);
});

app.use(express.static(__dirname));
app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());
app.use(require('morgan')('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(session({
    name: 'user_sid',
    secret: 'someRandomSecretCat',
    store: new MemoryStore(),
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

const checkIfLoggedIn = (req, res, next) => {
    if(req.session.user || req.cookies.user_sid){
        res.redirect('/')
    }else {
        next();
    }
}

require('./routes/home')(app);
require('./routes/post_routes')(app);
require('./routes/authenticate_user')(app);
require('./routes/update_settings')(app);
require('./routes/api_routes')(app);
require('./routes/handle_trade_request')(app);

app.get('/myBooks', checkAuth);

app.get('/allBooks', checkAuth);

app.get('/settings', checkAuth);

app.get('/login', checkIfLoggedIn);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000);