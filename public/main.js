// ui maybe

document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.wrapper');
    const containerParent = document.querySelector('main');
    let draggedElement = null;

    // Load saved order from localStorage
    const savedOrder = JSON.parse(localStorage.getItem('divOrder'));
    if (savedOrder) {
        savedOrder.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                containerParent.appendChild(element);
            }
        });
    }

    containers.forEach(container => {
        // Handle drag start event
        container.addEventListener('dragstart', (event) => {
            draggedElement = event.target;
            event.target.classList.add('dragging');
        });

        // Handle drag end event
        container.addEventListener('dragend', (event) => {
            event.target.classList.remove('dragging');
        });

        // Allow the drag over event
        container.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        // Handle drop event
        container.addEventListener('drop', (event) => {
            event.preventDefault();
            if (draggedElement !== event.target) {
                const draggedIndex = Array.from(containerParent.children).indexOf(draggedElement);
                const targetIndex = Array.from(containerParent.children).indexOf(event.target);

                if (draggedIndex > targetIndex) {
                    containerParent.insertBefore(draggedElement, event.target);
                } else {
                    containerParent.insertBefore(draggedElement, event.target.nextSibling);
                }
                saveOrder();
            }
        });
    });

    function saveOrder() {
        const order = Array.from(containerParent.children).map(child => child.id);
        localStorage.setItem('divOrder', JSON.stringify(order));
    }
});

