const router = require('express').Router();
//gets the files in the API directory
const apiDir = require('./api');
const homepageRoutes = require('./homepageRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homepageRoutes);
router.use('/api', apiDir);
router.use('/dashboard', dashboardRoutes);


// router.use((req, res) => {
//     res.status(400).end();
// });

module.exports = router;
