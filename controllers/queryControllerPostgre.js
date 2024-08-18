// Assuming dbPostgre.js exports a connected `pg` Pool instance
const db = require('../models/dbPostgre');

exports.runQuery = (req, res) => {
    const { query } = req.body; // Destructure query from request body

    // Ensure query is a string and not empty
    if (typeof query !== 'string' || query.trim() === '') {
        return res.status(400).json({ error: 'Invalid query' });
    }

    // Log the query for debugging
    console.log('Running query:', query);

    // Execute the query using `pg`'s `query` method
    db.query(query, (err, result) => {
        if (err) {
            console.error('Query Error:', err.message); // Log detailed error
            return res.status(500).json({ query, error: err.message });
        }

        // Send back the query and results
        res.json({ query, rows: result.rows });
    });
};
