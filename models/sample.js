const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to your SQLite database file
const dbPath = path.resolve(__dirname, '../database/telecom_company.db');
const db = new sqlite3.Database(dbPath);

// Function to fetch sample data
const getSampleData = (table, callback) => {
    if (!table) {
        return callback(new Error('Table name is required'));
    }

    const query = `SELECT * FROM ${table} LIMIT 5`;

    db.all(query, [], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

module.exports = { getSampleData };