const express = require('express'); //require express
const hbs = require('hbs'); //require hbs view engine
const fs = require('fs');  //require file system
var app = express();    // make a App via express
const port = process.env.PORT || 3000;
//set view engine to hbs
app.set('view engine', 'hbs');
//register hbs.template to use '/views/partials' folder
hbs.registerPartials(__dirname + '/views/partials');
//make a static directory for public view using '/public'
app.use(express.static(__dirname + '/public'));
//using midware to write a log before render actual HTML
app.use((req, res, next) => {  
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (e) => {
        if (e) console.log('Unable to append to server.log');
    });
    next();
});
//For maintance website
// app.use((req, res, next) => {
//     res.render('update');
// });


//Listening on Port
app.listen(port, () => {
    console.log(`Server is up running on Port:${port}`);
});

//register helper functions
hbs.registerHelper('getFullYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('scream', (text) => {
    return text.toUpperCase();
});

//binding event according to HTTP request
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        welcome: 'Welcome to Home Page.'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        welcome: 'Welcome to About Page. test for a change!'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'Projects Page',
        welcome: 'Welcome to Projects Page.'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad Request!'
    });
});

