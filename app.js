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

 app.get('/projects/:id', (req, res, next)=>{
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    if (!project) {next()} //makes sure there actually is a project to display before rendering
    res.render("project", {project})
});

/*** 
 404 handler 
 ***/

app.use((req, res, next)=>{
    const err = new Error();
    err.status = 404;
    err.message = 'The page you are looking for does not exist.'
    console.log(err.message, err.status);
    next(err);
})

/*** 
 global error handler 
 ***/
app.use((err, req, res, next) => {
    if (!err.status) {err.status = 500};
    if (!err.message) {err.message = 'A server error has occured'};
    console.log(err.status, err.message);
    res.status(err.status);
    if (err.status === 404) {
        res.render('page-not-found', { err })
    }
    else {
        res.render('error', { err })
    }
}
)

/* server */
app.listen(3000)
