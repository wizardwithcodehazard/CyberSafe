/**
 * Setup modal functionality
 * - Open modal
 * - Close modal
 * - Close on outside click
 */
export function setupModals() {
    const modalButtons = document.querySelectorAll('.learn-more-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const allModals = document.querySelectorAll('.modal');
    
    // Open modal
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Add animation class
                modal.querySelector('.modal-content').classList.add('animate-fade-in');
            }
        });
    });
    
    // Close modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });
    
    // Close modal on outside click
    allModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            allModals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        }
    });
}