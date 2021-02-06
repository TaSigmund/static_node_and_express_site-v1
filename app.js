/* dependencies */
const express = require('express');
const app = express();
const pug = require('pug');

const { projects } = require('./data/data.json');

/* view engine */
app.set('view engine', 'pug');

/* static assets */
app.use(express.static('public'));

/***
 ROUTES
 ***/

 app.get('/', (req, res)=>{res.render("index", {projects})});

 app.get('/about', (req, res)=>{res.render("about")});

 app.get('/projects/:id', (req, res)=>{res.render("project"), { projects }});

/* server */
app.listen(3000)
