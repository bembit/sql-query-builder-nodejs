const express = require('express');
const { runQuery } = require('../controllers/queryController');

const router = express.Router();

router.post('/', runQuery);

module.exports = router;
