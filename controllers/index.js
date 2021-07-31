const router = require('express').Router();
//Add models so I can use them
const { User, Blog, Comment } = require('../models');
//Express session data
const session = require('express-session');
//Authorization
const withAuth = require('../utils/auth');






module.exports = router;