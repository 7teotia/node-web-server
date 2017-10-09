/*jshint esversion: 6 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/template/partials');
hbs.registerHelper('getTime', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var timstamp = new Date().toString();
    fs.appendFile('server.log', timstamp + ' : ' + req.method + ' ' + req.path + '\n', (err) => {
        if (err) console.log(`Unable to connect ${err}`);

    });
    // next();
    if (req.path === '/about') {
        res.render('maintence')
    } else {
        next();
    }
})
app.set('view engine', 'hbs');
app.set('views', __dirname + '/template');
app.listen(port, undefined, () => {
    console.log(`Server  has been started at port ${port}`);

})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Epress framwork !');
    res.render('home.hbs', {
        user: "sandeep",
        like1: "Cricket",
        like2: "Music",
        time: new Date().getFullYear(),
        pageTitle: "Home page"
    })
});

app.get('/about', (req, res) => {
    // res.send('This is all about learning node via Express id: ' + req.params.id);
    res.render('about.hbs', {
        pageTitle: "About Page",
        time: new Date().getFullYear()
    });
});