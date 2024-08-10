// function runQuery() {
//     const table = document.getElementById('table').value;
//     const column = document.getElementById('column').value;
//     const condition = document.getElementById('condition').value;

//     const queryData = {
//         table: table,
//         column: column,
//         condition: condition
//     };

//     fetch('/api/query', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(queryData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('results').textContent = JSON.stringify(data, null, 2);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

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

// base variant with window.schema
// function displayTableDetails() {
//     const tableSelect = document.getElementById('table-select');
//     const selectedTable = tableSelect.value;

//     // Check if the schema is available and the selected table is valid
//     if (window.schema && window.schema[selectedTable]) {
//         const tableDetails = document.getElementById('table-details');
//         tableDetails.innerHTML = ''; // Clear existing details

//         const columns = window.schema[selectedTable];
//         columns.forEach(column => {
//             const columnElement = document.createElement('div');
//             columnElement.textContent = `Column: ${column.name}, Type: ${column.type}, Not Null: ${column.notNull}, Default: ${column.default}, Primary Key: ${column.primaryKey}`;
//             tableDetails.appendChild(columnElement);
//         });
//     } else {
//         console.error('Schema not available or invalid table selected.');
//     }
// }

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


// variant for dynamic table details
// function displayTableDetails() {
//     const table = document.getElementById('table-select').value;
//     if (table) {
//         fetch(`/api/table-details?table=${table}`)
//             .then(response => response.json())
//             .then(data => {
//                 const tableDetailsDiv = document.getElementById('table-details');
//                 const tableHtml = `
//                     <h3>Table: ${table}</h3>
//                     <table class="table-details">
//                         <thead>
//                             <tr>
//                                 <th>Column Name</th>
//                                 <th>Data Type</th>
//                                 <th>Not Null</th>
//                                 <th>Default</th>
//                                 <th>Primary Key</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             ${data.columns.map(column => `
//                                 <tr>
//                                     <td>${column.name}</td>
//                                     <td>${column.type}</td>
//                                     <td>${column.notNull ? 'Yes' : 'No'}</td>
//                                     <td>${column.default || ''}</td>
//                                     <td>${column.primaryKey ? 'Yes' : 'No'}</td>
//                                 </tr>
//                             `).join('')}
//                         </tbody>
//                     </table>
//                 `;
//                 tableDetailsDiv.innerHTML = tableHtml;
//             })
//             .catch(error => console.error('Error fetching table details:', error));
//     }
// }