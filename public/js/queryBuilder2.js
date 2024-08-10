document.addEventListener('DOMContentLoaded', () => {

    populateColumnSelect();
    populateTableSelect();

    function populateTableSelect() {
        fetch('/api/schema')
            .then(response => response.json())
            .then(schema => {
                console.log('Database Schema:', schema);
        
                const tableSelect = document.getElementById('select-table');
                tableSelect.innerHTML = ''; // Clear existing options
        
                Object.keys(schema).forEach(table => {
                    const option = document.createElement('option');
                    option.value = table;
                    option.textContent = table;
                    tableSelect.appendChild(option);
                });
        
                window.schema = schema; // Store schema in a global variable for future use
            })
            .catch(error => console.error('Error fetching schema:', error));
    }

    document.getElementById('select-table').addEventListener('change', (event) => {
        const selectedTable = event.target.value;
        populateColumnSelect(selectedTable);
    });

    function populateColumnSelect(table) {
        const columnSelect = document.getElementById('select-columns');
        columnSelect.innerHTML = ''; // Clear existing options

        if (table && window.schema[table]) {
            const columns = window.schema[table];
            columns.forEach(column => {
                const option = document.createElement('option');
                option.value = column.name;
                option.textContent = column.name;
                columnSelect.appendChild(option);
            });
        }
    }

    function updateQuery() {
        const columns = Array.from(document.getElementById('select-columns').selectedOptions).map(option => option.value).join(', ') || '*';
        const fromTable = document.getElementById('select-table').value;
        
        let query = `SELECT ${columns} FROM ${fromTable}`;
        
        // Include joins, where conditions, and other conditions if they exist
        const joins = Array.from(document.getElementById('join-inputs').children).map(div => {
            const inputs = div.querySelectorAll('input');
            return `JOIN ${inputs[0].value} ON ${inputs[1].value}`;
        }).join(' ');

        const whereConditions = Array.from(document.getElementById('where-inputs').children).map(div => div.querySelector('input').value).join(' AND ');

        const additionalConditions = Array.from(document.getElementById('condition-inputs').children).map(div => div.querySelector('input').value).join(' AND ');

        if (joins) {
            query += ' ' + joins;
        }
        if (whereConditions) {
            query += ' WHERE ' + whereConditions;
        }
        if (additionalConditions) {
            query += ' ' + additionalConditions;
        }

        document.getElementById('query-output').textContent = query;
    }

    document.getElementById('add-join').addEventListener('click', () => {
        // Logic to add join inputs
        updateQuery();
    });

    document.getElementById('add-where').addEventListener('click', () => {
        // Logic to add where inputs
        updateQuery();
    });

    document.getElementById('add-condition').addEventListener('click', () => {
        // Logic to add additional conditions
        updateQuery();
    });


});