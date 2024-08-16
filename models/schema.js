const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to your SQLite database file
const dbPath = path.resolve(__dirname, '../database/sqlite/telecom_company.db');
const db = new sqlite3.Database(dbPath);

// Function to get tables and their columns
const getSchema = (callback) => {
    const schema = {};

    db.serialize(() => {
        // Get list of tables
        db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
            if (err) {
                return callback(err);
            }

            if (tables.length === 0) {
                return callback(null, schema);
            }

            // Iterate over each table to get columns
            let tableCount = tables.length;
            let completedTables = 0;

            tables.forEach((table) => {
                const tableName = table.name;

                db.all(`PRAGMA table_info(${tableName})`, [], (err, columns) => {
                    if (err) {
                        return callback(err);
                    }

                    schema[tableName] = columns.map(col => ({
                        name: col.name,
                        type: col.type,
                        notNull: col.notnull,
                        default: col.dflt_value,
                        primaryKey: col.pk
                    }));

                    completedTables++;
                    
                    // Check if all tables have been processed
                    if (completedTables === tableCount) {
                        callback(null, schema);
                    }
                });
            });
        });
    });
};

module.exports = { getSchema };
