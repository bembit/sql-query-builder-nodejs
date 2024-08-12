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
        fetch('/api/schema')
            .then(response => response.json())
            .then(schemaData => {
                console.log('Database Schema:', schemaData);
    
                tableSelect.innerHTML = ''; 
    
                Object.keys(schemaData).forEach(table => {
                    const option = document.createElement('option');
                    option.value = table;
                    option.textContent = table;
                    tableSelect.appendChild(option);
                });
    
                schema = schemaData;
    
                // Select the first table by default and populate its columns
                const firstTable = tableSelect.options[0]?.value;
                if (firstTable) {
                    tableSelect.value = firstTable; // Set the dropdown to the first table
                    queryParts.from = firstTable; // Set the default table in query parts
                    populateColumnSelect(firstTable); // Populate columns for the first table
                    updateQuery();
                }
            })
            .catch(error => console.error('Error fetching schema:', error));
    }

    function populateColumnSelect(table, selectElement = columnSelect) {
        selectElement.innerHTML = ''; 

        if (table && schema[table]) {
            const columns = schema[table];
            columns.forEach(column => {
                const option = document.createElement('option');
                option.value = column.name;
                option.textContent = column.name;
                selectElement.appendChild(option);
            });
        }
    }

    function updateQuery() {
        const tableAlias = document.getElementById('table-alias').value.trim();
        const selectedTable = queryParts.from;
        
        // Get columns from the main table
        const mainTableColumns = Array.from(columnSelect.selectedOptions).map(option => {
            return tableAlias ? `${tableAlias}.${option.value}` : option.value;
        });

        // Initialize queryParts.select with columns from the main table
        queryParts.select = [...mainTableColumns];

        // Add columns from each join table
        document.querySelectorAll('.join-columns').forEach(select => {
            const joinTableColumns = Array.from(select.selectedOptions).map(option => option.value);
            const joinTableName = select.closest('.query-section').querySelector('input[placeholder="Join Table"]').value;
            const joinTableAlias = select.closest('.query-section').querySelector('input[placeholder="Join Alias"]').value || joinTableName;
            queryParts.select.push(...joinTableColumns.map(column => `${joinTableAlias}.${column}`));
        });

        // Construct the query
        let query = `SELECT ${queryParts.select.length > 0 ? queryParts.select.join(', ') : '*'}`;
        query += ` FROM ${selectedTable}`;
        if (tableAlias) {
            query += ` AS ${tableAlias}`;
        }

        // Add JOIN clauses
        if (queryParts.joins.length > 0) {
            query += ' ' + queryParts.joins.join(' ');
        }

        // Add WHERE clauses
        if (queryParts.where.length > 0) {
            query += ' WHERE ' + queryParts.where.join(' AND ');
        }

        // Add additional conditions
        if (queryParts.conditions.length > 0) {
            query += ' ' + queryParts.conditions.join(' AND ');
        }

        // Update the output
        queryOutput.textContent = query;
    }

    function handleInputChange() {
        queryParts.joins = Array.from(joinInputs.querySelectorAll('.query-section')).map(div => {
            const joinType = div.querySelector('select[placeholder="Join Type"]').value;
            const table = div.querySelector('input[placeholder="Join Table"]').value;
            const alias = div.querySelector('input[placeholder="Join Alias"]').value;
            const condition = div.querySelector('input[placeholder="Join Condition"]').value;
            return table && condition ? `${joinType} ${table} AS ${alias} ON ${condition}` : '';
        }).filter(join => join.trim() !== '');

        queryParts.where = Array.from(whereInputs.querySelectorAll('.query-section')).map(div => {
            const condition = div.querySelector('input[placeholder="WHERE Condition"]').value;
            return condition ? condition : '';
        }).filter(condition => condition.trim() !== '');

        queryParts.conditions = Array.from(conditionInputs.querySelectorAll('.query-section')).map(div => {
            const condition = div.querySelector('input[placeholder="Additional Condition"]').value;
            return condition ? condition : '';
        }).filter(condition => condition.trim() !== '');

        updateQuery();
    }

    function addJoin() {
        const joinDiv = document.createElement('div');
        joinDiv.className = 'query-section';
        joinDiv.innerHTML = `
            <select placeholder="Join Type">
                <option value="INNER JOIN">INNER JOIN</option>
                <option value="LEFT JOIN">LEFT JOIN</option>
                <option value="RIGHT JOIN">RIGHT JOIN</option>
                <option value="FULL JOIN">FULL JOIN</option>
            </select>
            <input type="text" placeholder="Join Table">
            <input type="text" placeholder="Join Alias">
            <input type="text" placeholder="Join Condition">
            <button class="remove-button">Remove</button>
            <div class="join-columns-container">
                <label for="join-columns">Select Columns:</label>
                <select class="join-columns" multiple>
                </select>
            </div>
        `;
        joinInputs.appendChild(joinDiv);

        joinDiv.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', handleInputChange);
        });
        joinDiv.querySelector('select').addEventListener('change', handleInputChange);
        joinDiv.querySelector('.remove-button').addEventListener('click', () => {
            joinInputs.removeChild(joinDiv);
            handleInputChange();
        });

        // Populate columns for the new join table
        const joinTableSelect = joinDiv.querySelector('input[placeholder="Join Table"]');
        joinTableSelect.addEventListener('change', (event) => {
            const table = event.target.value;
            const joinColumnSelect = joinDiv.querySelector('.join-columns');
            populateColumnSelect(table, joinColumnSelect);
        });

        updateQuery();
    }

    function addWhere() {
        const whereDiv = document.createElement('div');
        whereDiv.className = 'query-section';
        whereDiv.innerHTML = `
            <input type="text" placeholder="WHERE Condition">
            <button class="remove-button">Remove</button>
        `;
        whereInputs.appendChild(whereDiv);

        whereDiv.querySelector('input').addEventListener('input', handleInputChange);
        whereDiv.querySelector('.remove-button').addEventListener('click', () => {
            whereInputs.removeChild(whereDiv);
            handleInputChange();
        });

        updateQuery();
    }

    function addCondition() {
        const conditionDiv = document.createElement('div');
        conditionDiv.className = 'query-section';
        conditionDiv.innerHTML = `
            <input type="text" placeholder="Additional Condition">
            <button class="remove-button">Remove</button>
        `;
        conditionInputs.appendChild(conditionDiv);

        conditionDiv.querySelector('input').addEventListener('input', handleInputChange);
        conditionDiv.querySelector('.remove-button').addEventListener('click', () => {
            conditionInputs.removeChild(conditionDiv);
            handleInputChange();
        });

        updateQuery();
    }

    function runQuery() {
        const query = queryOutput.textContent;
        fetch('/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        })
        .then(response => response.json())
        .then(data => {
            queryResults.textContent = JSON.stringify(data.rows, null, 2);
            saveQueryToLocalStorage();
        })
        .catch(error => console.error('Error running query:', error));
    }

    // Function to generate a unique ID
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Save query to localStorage with unique ID
    function saveQueryToLocalStorage() {
        const queryText = queryOutput.textContent;
        const queryId = generateUniqueId();

        // Retrieve the existing queries from localStorage
        let queries = JSON.parse(localStorage.getItem('queries')) || [];

        // Add the new query as an object with ID and text
        queries.unshift({ id: queryId, text: queryText });

        // If there are more than 1000 queries, remove the oldest one
        if (queries.length > 1000) {
            queries.pop();
        }

        // Save the updated array back to localStorage
        localStorage.setItem('queries', JSON.stringify(queries));
    }

    tableSelect.addEventListener('change', (event) => {
        const table = event.target.value;
        queryParts.from = table;
        document.getElementById('table-alias').value = ''; // Reset alias input on table change
        populateColumnSelect(table);
        updateQuery();
    });

    columnSelect.addEventListener('change', updateQuery);
    
    document.getElementById('table-alias').addEventListener('input', updateQuery);
    document.getElementById('add-join').addEventListener('click', addJoin);
    document.getElementById('add-where').addEventListener('click', addWhere);
    document.getElementById('add-condition').addEventListener('click', addCondition);
    document.getElementById('run-query').addEventListener('click', runQuery);

    populateTableSelect();
});
