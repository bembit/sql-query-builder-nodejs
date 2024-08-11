import { ConfirmationDialog } from './confirmationDialogue.js';

document.addEventListener('DOMContentLoaded', () => {
    const queryModal = document.getElementById('query-modal');
    const openQueryModalButton = document.getElementById('open-query-modal');
    const closeModalButton = document.querySelector('.modal .close');
    const queryList = document.getElementById('query-list');
    const pageInfo = document.getElementById('page-info');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const queryResults = document.getElementById('query-results');

    let currentPage = 1;
    const queriesPerPage = 10;

    // Initialize the confirmation dialog component
    const confirmationDialog = new ConfirmationDialog(
        'confirmation-dialog',
        'confirm-delete',
        'cancel-delete',
        '#confirmation-dialog .close'
    );

    // Reference to the constructed query output element
    const queryOutput = document.getElementById('query-output');

    // Open modal
    openQueryModalButton.addEventListener('click', () => {
        queryModal.style.display = 'flex';
        displayQueries(currentPage, queryOutput, ''); // Initialize with empty search term
    });

    // Close modal
    closeModalButton.addEventListener('click', () => {
        queryModal.style.display = 'none';
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target == queryModal) {
            queryModal.style.display = 'none';
        }
    });

    // Pagination: Previous page
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayQueries(currentPage, queryOutput);
        }
    });

    // Pagination: Next page
    nextPageButton.addEventListener('click', () => {
        const savedQueries = JSON.parse(localStorage.getItem('queries')) || [];
        const totalPages = Math.ceil(savedQueries.length / queriesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayQueries(currentPage, queryOutput);
        }
    });

    // Display Queries with Pagination
    function displayQueries(page, queryOutput, searchTerm = '') {
        const savedQueries = JSON.parse(localStorage.getItem('queries')) || [];
        queryList.innerHTML = ''; // Clear the list
    
        // Filter queries based on search term
        const filteredQueries = savedQueries.filter(query =>
            query.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        const start = (page - 1) * queriesPerPage;
        const end = start + queriesPerPage;
        const paginatedQueries = filteredQueries.slice(start, end);
    
        paginatedQueries.forEach((query) => {
            const queryItem = document.createElement('div');
            queryItem.classList.add('query-item');
            queryItem.innerHTML = `
                <div class="query-text">${query.text}</div>
                <div class="query-buttons">
                    <button class="history-btn run-query" data-id="${query.id}">Run</button>
                    <button class="history-btn export-query" data-id="${query.id}">Export CSV</button>
                    <button disabled class="history-btn load-query" data-id="${query.id}">Load</button>
                    <button class="history-btn delete-query" data-id="${query.id}">Delete</button>
                </div>
            `;
    
            queryItem.querySelector('.load-query').addEventListener('click', (event) => {
                const id = event.target.dataset.id;
                const queryText = getQueryTextById(id);
                queryOutput.textContent = queryText;
                queryModal.style.display = 'none'; // Close the modal
            });
    
            queryItem.querySelector('.delete-query').addEventListener('click', (event) => {
                const id = event.target.dataset.id;
                confirmationDialog.showConfirmationDialog(
                    'Are you sure you want to delete this query?',
                    id,
                    (queryId) => {
                        console.log('Deleting query ID:', queryId); // Debugging
                        deleteQuery(queryId);
                        displayQueries(currentPage, queryOutput); // Refresh the list
                    }
                );
            });
    
            queryItem.querySelector('.run-query').addEventListener('click', (event) => {
                const id = event.target.dataset.id;
                const queryText = getQueryTextById(id);
                runQueryFromHistory(queryText, queryResults);
            });
    
            queryItem.querySelector('.export-query').addEventListener('click', (event) => {
                const id = event.target.dataset.id;
                const queryText = getQueryTextById(id);
                exportToCSV(queryText);
            });
    
            queryList.appendChild(queryItem);
        });
    
        // Update pagination info
        const totalPages = Math.ceil(filteredQueries.length / queriesPerPage);
        pageInfo.textContent = `Page ${page} of ${totalPages}`;
    
        // Disable/Enable buttons based on page position
        prevPageButton.disabled = page === 1;
        nextPageButton.disabled = page === totalPages;
    }
    
    // Helper function to get query text by ID
    function getQueryTextById(id) {
        const queries = JSON.parse(localStorage.getItem('queries')) || [];
        const query = queries.find(query => query.id === id);
        return query ? query.text : '';
    }

    function deleteQuery(id) {
        let queries = JSON.parse(localStorage.getItem('queries')) || [];
        console.log('Before deletion:', queries); // Debugging
        queries = queries.filter(query => query.id !== id);
        console.log('After deletion:', queries); // Debugging
        localStorage.setItem('queries', JSON.stringify(queries));
    }

    function runQueryFromHistory(queryText, queryResults) {
        fetch('/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: queryText })
        })
        .then(response => response.json())
        .then(data => {
            queryResults.textContent = JSON.stringify(data.rows, null, 2);
        })
        .catch(error => console.error('Error running query:', error));
    }

    function exportToCSV(queryText) {
        // Placeholder function for exporting query results to CSV
        console.log('Exporting to CSV:', queryText);
    }

    document.getElementById('search-query').addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        currentPage = 1; // Reset to first page on new search
        displayQueries(currentPage, queryOutput, searchTerm);
    });
});
