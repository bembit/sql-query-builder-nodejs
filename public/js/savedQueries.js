document.addEventListener('DOMContentLoaded', () => {
    const queryModal = document.getElementById('query-modal');
    const openQueryModalButton = document.getElementById('open-query-modal');
    const closeModalButton = document.querySelector('.modal .close');
    const queryList = document.getElementById('query-list');
    const pageInfo = document.getElementById('page-info');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    
    let currentPage = 1;
    const queriesPerPage = 10;

    // Reference to the constructed query output element
    const queryOutput = document.getElementById('query-output');

    // Open modal
    openQueryModalButton.addEventListener('click', () => {
        queryModal.style.display = 'block';
        displayQueries(currentPage, queryOutput);
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
    function displayQueries(page, queryOutput) {
        const savedQueries = JSON.parse(localStorage.getItem('queries')) || [];
        queryList.innerHTML = ''; // Clear the list

        const start = (page - 1) * queriesPerPage;
        const end = start + queriesPerPage;
        const paginatedQueries = savedQueries.slice(start, end);

        paginatedQueries.forEach((query, index) => {
            const queryItem = document.createElement('div');
            queryItem.classList.add('query-item');
            queryItem.textContent = query;
            queryItem.addEventListener('click', () => {
                // Paste the selected query into the constructed query area
                queryOutput.textContent = query;
                queryModal.style.display = 'none'; // Close the modal
            });
            queryList.appendChild(queryItem);
        });

        // Update pagination info
        const totalPages = Math.ceil(savedQueries.length / queriesPerPage);
        pageInfo.textContent = `Page ${page} of ${totalPages}`;

        // Disable/Enable buttons based on page position
        prevPageButton.disabled = page === 1;
        nextPageButton.disabled = page === totalPages;
    }
});
