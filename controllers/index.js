const router = require('express').Router();
//gets the files in the API directory
const apiDir = require('./api');
const home = require('./homepageRoutes');
const dash = require('./dashboardRoutes');

router.use('/', home);
router.use('/api', apiDir);
router.use('/dashboard', dash);


router.use((req, res) => {
    res.status(400).end();
});

module.exports = router;
