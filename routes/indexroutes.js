const express = require('express');
const routes = express.Router();

const {verifyToken} = require('../config/passport-strargy');
const {checkRole} = require('../config/passport-strargy');

const adminController = require('../controller/adminController');

routes.post('/insertData',adminController.insertData);
routes.get('/viewData',verifyToken,checkRole('admin'),adminController.viewData);
routes.post('/loginData',verifyToken,checkRole('admin'),adminController.loginData);
// routes.post('/deleteData',checkRole,verifyToken,adminController.deleteData);

module.exports = routes;

