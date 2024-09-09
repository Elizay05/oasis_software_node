const express = require("express");
const router = express.Router();

// INDEX
router.get('/index', async (req, res) => {
    res.render('pages/index');
});

module.exports = router;