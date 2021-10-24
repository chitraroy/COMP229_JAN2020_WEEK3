var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let buscontactController = require('../controller/buscontact');

//connect to data model

let Buscontact = require('../models/buscontact');

//Auth Function 

function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}

/* Read. */
router.get('/list',buscontactController.buscontactList);

/* Update. */
router.get('/edit/:id',requireAuth,buscontactController.displayEditPage);
router.post('/edit/:id',requireAuth, buscontactController.processEditPage);

/* Delete */
router.get('/delete/:id',requireAuth, buscontactController.performDelete);

/* Create */
router.get('/add',requireAuth, buscontactController.displayAddPage);
router.post('/add',requireAuth, buscontactController.processAddPage);


module.exports = router;