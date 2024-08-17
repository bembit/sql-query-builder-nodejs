const express = require('express');
const { getSampleData } = require('../models/sample');

const router = express.Router();

// Route to get sample data from a specific table
router.get('/', (req, res) => {
    const table = req.query.table;
    if (!table) {
        return res.status(400).json({ error: 'Table name is required' });
    }

    getSampleData(table, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ rows });
        console.log(rows);
    });
});

module.exports = router;
