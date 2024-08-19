// schema.js (PostgreSQL version)

const pool = require('./dbPostgre');

// Function to get tables and their columns
const getSchema = (callback) => {
    const schema = {};

    // Get list of tables
    const tableQuery = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
    `;

    pool.query(tableQuery, (err, tablesResult) => {
        if (err) {
            return callback(err);
        }

        if (tablesResult.rows.length === 0) {
            return callback(null, schema);
        }

        // Iterate over each table to get columns
        let tableCount = tablesResult.rows.length;
        let completedTables = 0;

        tablesResult.rows.forEach((table) => {
            const tableName = table.table_name;

            const columnQuery = `
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns
                WHERE table_name = $1
            `;

            pool.query(columnQuery, [tableName], (err, columnsResult) => {
                if (err) {
                    return callback(err);
                }

                schema[tableName] = columnsResult.rows.map(col => ({
                    name: col.column_name,
                    type: col.data_type,
                    notNull: col.is_nullable === 'NO',
                    default: col.column_default
                }));

                completedTables++;

                // Check if all tables have been processed
                if (completedTables === tableCount) {
                    callback(null, schema);
                }
            });
        });
    });
};

module.exports = { getSchema };
