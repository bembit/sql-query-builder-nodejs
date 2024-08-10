// const db = require('../models/db');

// exports.runQuery = (req, res) => {
//     // const { table, column, condition } = req.body;
//     // const query = `SELECT ${column} FROM ${table} WHERE ${condition}`;
//     const query = req.body;

//     db.all(query, [], (err, rows) => {
//         if (err) {
//             return res.status(500).json({ query: query, error: err.message });
//         }
//         console.log(query);
//         res.json({
//             query: query,
//             rows: rows
//         });
//         // res.json(query);
//     });
// };

const db = require('../models/db');

exports.runQuery = (req, res) => {
    const { query } = req.body; // Destructure query from request body

    // Ensure query is a string and not empty
    if (typeof query !== 'string' || query.trim() === '') {
        return res.status(400).json({ error: 'Invalid query' });
    }

    // Log the query for debugging
    console.log('Running query:', query);

    // Execute the query
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Query Error:', err.message); // Log detailed error
            return res.status(500).json({ query, error: err.message });
        }

        // Send back the query and results
        res.json({ query, rows });
    });
};


// const db = require('../models/db');

// class QueryController {
//     constructor(database) {
//         this.db = database;
//     }

//     runQuery(req, res) {
//         const { table, column, condition } = req.body;
//         const query = `SELECT ${column} FROM ${table} WHERE ${condition}`;

//         this.db.all(query, [], (err, rows) => {
//             if (err) {
//                 return res.status(500).json({ query: query, error: err.message });
//             }
//             console.log(query);
//             res.json({
//                 query: query,
//                 rows: rows
//             });
//         });
//     }

//     // You can add more methods as needed
//     // e.g., insertRecord, updateRecord, deleteRecord, etc.
// }

// module.exports = new QueryController(db);