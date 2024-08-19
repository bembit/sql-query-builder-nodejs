// db.js (PostgreSQL version)

const { Pool } = require('pg');

// Define the connection details to your PostgreSQL database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432, // Default PostgreSQL port
});

// Test the connection
pool.connect((err) => {
    if (err) {
        console.error('Could not connect to the PostgreSQL database', err);
    } else {
        console.log('Connected to the PostgreSQL database');
    }
});

module.exports = pool;
