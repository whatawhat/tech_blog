const router = require('express').Router();
//gets the files in the API directory
const apiDir = require('./api');

router.use('/api', apiDir);

router.use((req, res) => {
    res.status(400).end();
});

module.exports = router;
