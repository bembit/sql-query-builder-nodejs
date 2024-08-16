const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to your SQLite database file
const dbPath = path.resolve(__dirname, '../database/sqlite/telecom_company.db');

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to the SQLite database');
    }
});

module.exports = db;

// force create dir if not exis with fs

// const fs = require('fs');
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// // Ensure the directory exists
// const dbDir = path.resolve(__dirname, '../database');
// if (!fs.existsSync(dbDir)) {
//     fs.mkdirSync(dbDir);
// }

// // Define the path to your SQLite database file
// const dbPath = path.join(dbDir, 'telecom_company.db');

// // Log the resolved path to check if it's correct
// console.log('Database path:', dbPath);

// // Connect to the SQLite database
// const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Could not connect to database', err);
//     } else {
//         console.log('Connected to the SQLite database');
//     }
// });

// module.exports = db;
