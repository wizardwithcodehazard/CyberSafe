/**
 * Setup scroll animations for elements
 * Uses Intersection Observer to trigger animations when elements enter viewport
 */
export function setupScrollAnimation() {
    // Elements to animate on scroll
    const sections = document.querySelectorAll('.section');
    const sectionTitles = document.querySelectorAll('.section-title');
    const crimeCards = document.querySelectorAll('.crime-card');
    const statCards = document.querySelectorAll('.stat-card');
    const heroSection = document.querySelector('.hero');
    
    // Create observer for section titles
    const titleObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, 
        { threshold: 0.1 }
    );
    
    // Create observer for sections
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation to children
                    const animatableChildren = entry.target.querySelectorAll('.crime-card, .stat-card');
                    animatableChildren.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, 100 * (index + 1));
                    });
                }
            });
        }, 
        { threshold: 0.1 }
    );
    
    // Create observer for hero section
    const heroObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, 
        { threshold: 0.1 }
    );
    
    // Observe elements
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Create custom animation for any elements with specific animation classes
    const animatedElements = document.querySelectorAll(
        '.scroll-fade-in, .scroll-fade-up, .scroll-fade-left, .scroll-fade-right, .scroll-scale'
    );
    
    const elementObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );
    
    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });
}