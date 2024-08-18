// sampleData.js (PostgreSQL version)

const pool = require('./dbPostgre');

// Function to fetch sample data
const getSampleData = (table, callback) => {
    if (!table) {
        return callback(new Error('Table name is required'));
    }

    const query = `SELECT * FROM ${table} LIMIT 5`;

    pool.query(query, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result.rows);
    });
};

module.exports = { getSampleData };
