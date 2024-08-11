// confirmationDialog.js

export class ConfirmationDialog {
    constructor(dialogId, confirmButtonId, cancelButtonId, closeButtonSelector) {
        this.confirmationDialog = document.getElementById(dialogId);
        this.confirmDeleteButton = document.getElementById(confirmButtonId);
        this.cancelDeleteButton = document.getElementById(cancelButtonId);
        this.closeDialogButton = document.querySelector(closeButtonSelector);
        this.currentDeleteId = null;
        this.onConfirm = null;

        // Initialize event listeners
        this.initEventListeners();
    }

    initEventListeners() {
        this.confirmDeleteButton.addEventListener('click', () => {
            if (this.onConfirm && this.currentDeleteId) {
                this.onConfirm(this.currentDeleteId);
            }
            this.closeConfirmationDialog();
        });

        this.cancelDeleteButton.addEventListener('click', () => {
            this.closeConfirmationDialog();
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.confirmationDialog) {
                this.closeConfirmationDialog();
            }
        });

        this.closeDialogButton.addEventListener('click', () => {
            this.closeConfirmationDialog();
        });
    }

    showConfirmationDialog(message, id, onConfirm) {
        document.getElementById('confirmation-message').textContent = message;
        this.confirmationDialog.style.display = 'block';
        this.currentDeleteId = id;
        this.onConfirm = onConfirm;
    }

    closeConfirmationDialog() {
        this.confirmationDialog.style.display = 'none';
        this.currentDeleteId = null;
        this.onConfirm = null;
    }
}
