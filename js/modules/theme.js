/**
 * Setup theme toggle functionality
 * - Toggle between light and dark mode
 * - Store theme preference in localStorage
 */
export function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use user's system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a brief animation to the toggle
        themeToggle.classList.add('animate-pulse');
        setTimeout(() => {
            themeToggle.classList.remove('animate-pulse');
        }, 500);
    });
    
    // Listen for changes in system preference
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.setAttribute('data-theme', 'dark');
            } else {
                document.body.setAttribute('data-theme', 'light');
            }
        }
    });
}