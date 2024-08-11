function populateTableSelect() {
    // Fetch the schema information from the backend
    fetch('/api/schema')
        .then(response => response.json())
        .then(schema => {
            console.log('Database Schema:', schema);

            // Get the table select dropdown element
            const tableSelect = document.getElementById('table-select');
            
            // Clear existing options before adding new ones
            tableSelect.innerHTML = '';

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

function displayTableDetails() {
    const tableSelect = document.getElementById('table-select');
    const selectedTable = tableSelect.value;

    // Check if the schema is available and the selected table is valid
    if (window.schema && window.schema[selectedTable]) {
        const tableDetails = document.getElementById('table-details');
        tableDetails.innerHTML = ''; // Clear existing details

        const columns = window.schema[selectedTable];

        // Create a table for better presentation
        const tableHtml = `
            <h3>Table: ${selectedTable}</h3>
            <table class="table-details">
                <thead>
                    <tr>
                        <th>Column Name</th>
                        <th>Data Type</th>
                        <th>Not Null</th>
                        <th>Default</th>
                        <th>Primary Key</th>
                    </tr>
                </thead>
                <tbody>
                    ${columns.map(column => `
                        <tr>
                            <td>${column.name}</td>
                            <td>${column.type}</td>
                            <td>${column.notNull ? 'Yes' : 'No'}</td>
                            <td>${column.default || ''}</td>
                            <td>${column.primaryKey ? 'Yes' : 'No'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        tableDetails.innerHTML = tableHtml;
    } else {
        console.error('Schema not available or invalid table selected.');
    }
}
