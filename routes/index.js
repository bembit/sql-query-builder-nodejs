const express = require('express');
const schemaRoutes = require('./schemaRoutes');
const queryRoutes = require('./queryRoutes');
const sampleRoutes = require('./sampleRoutes');

const router = express.Router();

// Use query routes for any requests to /api/query
router.use('/query', queryRoutes);
router.use('/schema', schemaRoutes);
router.use('/sample-data', sampleRoutes);

module.exports = router;
