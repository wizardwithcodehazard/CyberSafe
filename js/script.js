// Import modules
import { setupNavigation } from './modules/navigation.js';
import { setupThemeToggle } from './modules/theme.js';
import { setupQATest } from './modules/qaTest.js';
import { setupExpertForm } from './modules/form.js';
import { setupScrollAnimation } from './modules/animations.js';
import { setupStatistics } from './modules/statistics.js';
import { setupModals } from './modules/modals.js';

// Document ready function
function ready(callback) {
    if (document.readyState !== "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}

// Initialize all modules
ready(() => {
    setupNavigation();
    setupThemeToggle();
    setupQATest();
    setupExpertForm();
    setupScrollAnimation();
    setupStatistics();
    setupModals();
    
    // Set the hero section as visible for animations
    document.querySelector('.hero').classList.add('visible');
});