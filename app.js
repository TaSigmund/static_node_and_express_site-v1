/* dependencies */
const express = require('express');
const app = express();
const pug = require('pug');

const { projects } = require('./data/data.json');

/* view engine */
app.set('view engine', 'pug');

/* static assets */
app.use('/static', express.static('public'));

/***
 ROUTES
 ***/

 app.get('/', (req, res)=>{res.render("index", {projects})});

 app.get('/about', (req, res)=>{res.render("about")});

 app.get('/projects/:id', (req, res)=>{
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    res.render("project", {project})
});

/* server */
app.listen(3000)
