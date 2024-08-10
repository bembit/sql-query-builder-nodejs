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
    
                const tableSelect = document.getElementById('select-table');
                tableSelect.innerHTML = ''; // Clear existing options
    
                Object.keys(schemaData).forEach(table => {
                    const option = document.createElement('option');
                    option.value = table;
                    option.textContent = table;
                    tableSelect.appendChild(option);
                });
    
                window.schema = schemaData;
            })
            .catch(error => console.error('Error fetching schema:', error));
    }

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

    function handleInputChange() {
        queryParts.joins = Array.from(joinInputs.querySelectorAll('.query-section')).map(div => {
            const table = div.querySelector('input[placeholder="Join Table"]').value;
            const condition = div.querySelector('input[placeholder="Join Condition"]').value;
            return table && condition ? `JOIN ${table} ON ${condition}` : '';
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
            <input type="text" placeholder="Join Table">
            <input type="text" placeholder="Join Condition">
            <button class="remove-button">Remove</button>
        `;
        joinInputs.appendChild(joinDiv);

        joinDiv.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', handleInputChange);
        });
        joinDiv.querySelector('.remove-button').addEventListener('click', () => {
            joinInputs.removeChild(joinDiv);
            handleInputChange();
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
        saveQueryToLocalStorage();
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
        })
        .catch(error => console.error('Error running query:', error));
    }

    // will create new sql table for previous queries so we can load them later
    function saveQueryToLocalStorage() {
        const query = queryOutput.textContent;
        localStorage.setItem('query', query);
    }

    tableSelect.addEventListener('change', (event) => {
        const table = event.target.value;
        queryParts.from = table;
        populateColumnSelect(table);
        updateQuery();
    });

    columnSelect.addEventListener('change', updateQuery);

    document.getElementById('add-join').addEventListener('click', addJoin);
    document.getElementById('add-where').addEventListener('click', addWhere);
    document.getElementById('add-condition').addEventListener('click', addCondition);
    document.getElementById('run-query').addEventListener('click', runQuery);

    populateTableSelect();
});
