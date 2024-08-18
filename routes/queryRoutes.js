const express = require('express');
const { runQuery } = require('../controllers/queryControllerPostgre');

const router = express.Router();

router.post('/', runQuery);

module.exports = router;
