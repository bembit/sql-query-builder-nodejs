const express = require('express');
const schemaRoutes = require('./schemaRoutes');
const queryRoutes = require('./queryRoutes');

const router = express.Router();

// Use query routes for any requests to /api/query
router.use('/query', queryRoutes);
router.use('/schema', schemaRoutes);

module.exports = router;
