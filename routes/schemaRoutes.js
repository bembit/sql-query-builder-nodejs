const express = require('express');
const { getSchema } = require('../models/schema');

const router = express.Router();

// Route to get the database schema
router.get('/', (req, res) => {
    getSchema((err, schema) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(schema);
    });
});

module.exports = router;
