/**
 * Setup Expert Form functionality
 * - Form validation
 * - Form submission
 */
export function setupExpertForm() {
    const expertForm = document.getElementById('expert-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const issueInput = document.getElementById('issue');
    
    if (!expertForm) return;
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Validate name (at least 2 characters)
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        // Validate phone (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            showError(phoneInput, 'Please enter a valid 10-digit phone number');
            isValid = false;
        } else {
            removeError(phoneInput);
        }
        
        // Validate issue description (at least 10 characters)
        if (issueInput.value.trim().length < 10) {
            showError(issueInput, 'Please provide more details about your issue (at least 10 characters)');
            isValid = false;
        } else {
            removeError(issueInput);
        }
        
        return isValid;
    }
    
    // Show error message
    function showError(input, message) {
        // Remove any existing error
        removeError(input);
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--error-color)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '4px';
        
        // Add error styles to input
        input.style.borderColor = 'var(--error-color)';
        
        // Insert error message after input
        input.parentNode.appendChild(errorDiv);
    }
    
    // Remove error message
    function removeError(input) {
        // Remove error styles from input
        input.style.borderColor = '';
        
        // Remove error message if exists
        const errorDiv = input.parentNode.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Form submission
    expertForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            issue: issueInput.value.trim(),
            contactMethod: document.querySelector('input[name="contact-method"]:checked').value
        };
        
        // Log form data to console (for demo purposes)
        console.log('Form Submission:', formData);
        
        // Show success message
        alert('Request Submitted – We\'ll contact you soon');
        
        // Reset form
        expertForm.reset();
    });
    
    // Input validation on blur
    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim() !== '') {
            validateForm();
        }
    });
    
    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value.trim() !== '') {
            validateForm();
        }
    });
    
    issueInput.addEventListener('blur', () => {
        if (issueInput.value.trim() !== '') {
            validateForm();
        }
    });
}