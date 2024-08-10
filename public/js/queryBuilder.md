// document.addEventListener('DOMContentLoaded', () => {
//     const tableSelect = document.getElementById('select-table');
//     const queryOutput = document.getElementById('query-output');
//     let queryParts = {
//         select: '*',
//         from: '',
//         joins: [],
//         where: [],
//         conditions: []
//     };

//     // Populate the table dropdown (assuming you have a function for this)
//     populateTableSelect();

//     function populateTableSelect() {
//         // Fetch the schema information from the backend
//         fetch('/api/schema')
//             .then(response => response.json())
//             .then(schema => {
//                 console.log('Database Schema:', schema);
    
//                 // Get the table select dropdown element
//                 const tableSelect = document.getElementById('select-table');
                
//                 // Clear existing options before adding new ones
//                 tableSelect.innerHTML = '';
    
//                 // Populate the dropdown with new options
//                 Object.keys(schema).forEach(table => {
//                     const option = document.createElement('option');
//                     option.value = table;
//                     option.textContent = table;
//                     tableSelect.appendChild(option);
//                 });
    
//                 window.schema = schema;
//             })
//             .catch(error => console.error('Error fetching schema:', error));
//     }

//     function updateQuery() {
//         let query = `SELECT ${queryParts.select} FROM ${queryParts.from}`;
//         if (queryParts.joins.length > 0) {
//             query += ' ' + queryParts.joins.join(' ');
//         }
//         if (queryParts.where.length > 0) {
//             query += ' WHERE ' + queryParts.where.join(' AND ');
//         }
//         if (queryParts.conditions.length > 0) {
//             query += ' ' + queryParts.conditions.join(' AND ');
//         }
//         queryOutput.textContent = query;
//     }

//     function addJoin() {
//         const table = prompt('Enter table to join:');
//         const condition = prompt('Enter join condition (e.g., table1.id = table2.id):');
//         if (table && condition) {
//             queryParts.joins.push(`JOIN ${table} ON ${condition}`);
//             updateQuery();
//         }
//     }

//     function addWhere() {
//         const condition = prompt('Enter WHERE condition (e.g., age > 30):');
//         if (condition) {
//             queryParts.where.push(condition);
//             updateQuery();
//         }
//     }

//     function addCondition() {
//         const condition = prompt('Enter additional condition (e.g., salary < 50000):');
//         if (condition) {
//             queryParts.conditions.push(condition);
//             updateQuery();
//         }
//     }

//     document.getElementById('add-join').addEventListener('click', addJoin);
//     document.getElementById('add-where').addEventListener('click', addWhere);
//     document.getElementById('add-condition').addEventListener('click', addCondition);

//     tableSelect.addEventListener('change', (event) => {
//         queryParts.from = event.target.value;
//         updateQuery();
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const tableSelect = document.getElementById('select-table');
//     const queryOutput = document.getElementById('query-output');
//     const queryResults = document.getElementById('query-results');
//     const joinInputs = document.getElementById('join-inputs');
//     const whereInputs = document.getElementById('where-inputs');
//     const conditionInputs = document.getElementById('condition-inputs');
//     let queryParts = {
//         select: '*',
//         from: '',
//         joins: [],
//         where: [],
//         conditions: []
//     };

//     function populateTableSelect() {
//         // Fetch the schema information from the backend
//         fetch('/api/schema')
//             .then(response => response.json())
//             .then(schema => {
//                 console.log('Database Schema:', schema);
    
//                 // Get the table select dropdown element
//                 const tableSelect = document.getElementById('select-table');
                
//                 // Clear existing options before adding new ones
//                 tableSelect.innerHTML = '';
    
//                 // Populate the dropdown with new options
//                 Object.keys(schema).forEach(table => {
//                     const option = document.createElement('option');
//                     option.value = table;
//                     option.textContent = table;
//                     tableSelect.appendChild(option);
//                 });
    
//                 window.schema = schema;
//             })
//             .catch(error => console.error('Error fetching schema:', error));
//     }

//     function updateQuery() {
//         let query = `SELECT ${queryParts.select} FROM ${queryParts.from}`;
//         if (queryParts.joins.length > 0) {
//             query += ' ' + queryParts.joins.join(' ');
//         }
//         if (queryParts.where.length > 0) {
//             query += ' WHERE ' + queryParts.where.join(' AND ');
//         }
//         if (queryParts.conditions.length > 0) {
//             query += ' ' + queryParts.conditions.join(' AND ');
//         }
//         queryOutput.textContent = query;
//     }

//     function addJoin() {
//         const joinDiv = document.createElement('div');
//         joinDiv.className = 'query-section';
//         joinDiv.innerHTML = `
//             <input type="text" placeholder="Join Table">
//             <input type="text" placeholder="Join Condition">
//             <button class="remove-button">Remove</button>
//         `;
//         joinInputs.appendChild(joinDiv);

//         joinDiv.querySelector('.remove-button').addEventListener('click', () => {
//             joinInputs.removeChild(joinDiv);
//             updateQuery();
//         });
//     }

//     function addWhere() {
//         const whereDiv = document.createElement('div');
//         whereDiv.className = 'query-section';
//         whereDiv.innerHTML = `
//             <input type="text" placeholder="WHERE Condition">
//             <button class="remove-button">Remove</button>
//         `;
//         whereInputs.appendChild(whereDiv);

//         whereDiv.querySelector('.remove-button').addEventListener('click', () => {
//             whereInputs.removeChild(whereDiv);
//             updateQuery();
//         });
//     }

//     function addCondition() {
//         const conditionDiv = document.createElement('div');
//         conditionDiv.className = 'query-section';
//         conditionDiv.innerHTML = `
//             <input type="text" placeholder="Additional Condition">
//             <button class="remove-button">Remove</button>
//         `;
//         conditionInputs.appendChild(conditionDiv);

//         conditionDiv.querySelector('.remove-button').addEventListener('click', () => {
//             conditionInputs.removeChild(conditionDiv);
//             updateQuery();
//         });
//     }

//     function runQuery() {
//         const query = queryOutput.textContent;

//         fetch('/api/run-query', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ query: query })
//         })
//         .then(response => response.json())
//         .then(data => {
//             queryResults.textContent = JSON.stringify(data.rows, null, 2);
//         })
//         .catch(error => console.error('Error running query:', error));
//     }

//     document.getElementById('add-join').addEventListener('click', addJoin);
//     document.getElementById('add-where').addEventListener('click', addWhere);
//     document.getElementById('add-condition').addEventListener('click', addCondition);
//     document.getElementById('run-query').addEventListener('click', runQuery);

//     tableSelect.addEventListener('change', (event) => {
//         queryParts.from = event.target.value;
//         updateQuery();
//     });

//     populateTableSelect();
// });

document.addEventListener('DOMContentLoaded', () => {
    const tableSelect = document.getElementById('select-table');
    const columnSelect = document.getElementById('select-columns');
    const queryOutput = document.getElementById('query-output');
    const queryResults = document.getElementById('query-results');
    const joinInputs = document.getElementById('join-inputs');
    const whereInputs = document.getElementById('where-inputs');
    const conditionInputs = document.getElementById('condition-inputs');
    let queryParts = {
        select: '*',
        from: '',
        joins: [],
        where: [],
        conditions: []
    };
    let schema = {};

    function populateTableSelect() {
        // Fetch the schema information from the backend
        fetch('/api/schema')
            .then(response => response.json())
            .then(schema => {
                console.log('Database Schema:', schema);
    
                // Get the table select dropdown element
                const tableSelect = document.getElementById('select-table');
                
                // Populate the dropdown with new options
                Object.keys(schema).forEach(table => {
                    const option = document.createElement('option');
                    option.value = table;
                    option.textContent = table;
                    tableSelect.appendChild(option);
                });
    
                window.schema = schema;
            })
            .catch(error => console.error('Error fetching schema:', error));
    }

    function populateColumnSelect(table) {
        columnSelect.innerHTML = '';
        if (table && schema[table]) {
            const columns = schema[table].columns;
            columns.forEach(column => {
                const option = document.createElement('option');
                option.value = column;
                option.textContent = column;
                columnSelect.appendChild(option);
            });
        }
    }

    function updateQuery() {
        const columns = Array.from(columnSelect.selectedOptions).map(option => option.value).join(', ') || '*';
        queryParts.select = columns;
        let query = `SELECT ${queryParts.select} FROM ${queryParts.from}`;
        if (queryParts.joins.length > 0) {
            query += ' ' + queryParts.joins.join(' ');
        }
        if (queryParts.where.length > 0) {
            query += ' WHERE ' + queryParts.where.join(' AND ');
        }
        if (queryParts.conditions.length > 0) {
            query += ' ' + queryParts.conditions.join(' AND ');
        }
        queryOutput.textContent = query;
    }

    function addJoin() {
        const joinDiv = document.createElement('div');
        joinDiv.className = 'query-section';
        joinDiv.innerHTML = `
            <input type="text" placeholder="Join Table">
            <input type="text" placeholder="Join Condition">
            <button class="remove-button">Remove</button>
        `;
        joinInputs.appendChild(joinDiv);

        joinDiv.querySelector('.remove-button').addEventListener('click', () => {
            joinInputs.removeChild(joinDiv);
            updateQuery();
        });
    }

    function addWhere() {
        const whereDiv = document.createElement('div');
        whereDiv.className = 'query-section';
        whereDiv.innerHTML = `
            <input type="text" placeholder="WHERE Condition">
            <button class="remove-button">Remove</button>
        `;
        whereInputs.appendChild(whereDiv);

        whereDiv.querySelector('.remove-button').addEventListener('click', () => {
            whereInputs.removeChild(whereDiv);
            updateQuery();
        });
    }

    function addCondition() {
        const conditionDiv = document.createElement('div');
        conditionDiv.className = 'query-section';
        conditionDiv.innerHTML = `
            <input type="text" placeholder="Additional Condition">
            <button class="remove-button">Remove</button>
        `;
        conditionInputs.appendChild(conditionDiv);

        conditionDiv.querySelector('.remove-button').addEventListener('click', () => {
            conditionInputs.removeChild(conditionDiv);
            updateQuery();
        });
    }

    function runQuery() {
        const query = queryOutput.textContent;

        fetch('/api/run-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        })
        .then(response => response.json())
        .then(data => {
            queryResults.textContent = JSON.stringify(data.rows, null, 2);
        })
        .catch(error => console.error('Error running query:', error));
    }

    tableSelect.addEventListener('change', (event) => {
        const table = event.target.value;
        queryParts.from = table;
        populateColumnSelect(table);
        updateQuery();
    });

    document.getElementById('add-join').addEventListener('click', addJoin);
    document.getElementById('add-where').addEventListener('click', addWhere);
    document.getElementById('add-condition').addEventListener('click', addCondition);
    document.getElementById('run-query').addEventListener('click', runQuery);

    populateTableSelect();
});
