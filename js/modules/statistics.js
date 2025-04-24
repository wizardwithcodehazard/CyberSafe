/**
 * Setup statistics counter animations
 * Uses Intersection Observer to trigger counting animation when stats are visible
 */
export function setupStatistics() {
    const casesCount = document.getElementById('cases-count');
    const moneyLost = document.getElementById('money-lost');
    const financialPercent = document.getElementById('financial-percent');
    
    // Final values for the counters
    const casesValue = 1200000; // 1.2M
    const moneyValue = 11333; // ₹11,333 crore
    const percentValue = 80; // 80%
    
    // Animation duration in milliseconds
    const animationDuration = 2000;
    
    // Function to format numbers
    function formatNumber(number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(0) + 'K';
        }
        return number.toString();
    }
    
    // Counter animation function
    function animateCounter(element, start, end, duration, prefix = '', suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            
            // Format and display the value
            if (prefix === '₹') {
                element.textContent = `${prefix}${formatNumber(currentValue)}`;
            } else {
                element.textContent = `${prefix}${formatNumber(currentValue)}${suffix}`;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
    
    // Create observer to trigger counter animation
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start animations when stats section is visible
                    
                    // Cases count animation
                    if (casesCount) {
                        animateCounter(casesCount, 0, casesValue, animationDuration);
                    }
                    
                    // Money lost animation
                    if (moneyLost) {
                        animateCounter(moneyLost, 0, moneyValue, animationDuration, '₹');
                    }
                    
                    // Financial percentage animation
                    if (financialPercent) {
                        animateCounter(financialPercent, 0, percentValue, animationDuration, '', '%');
                    }
                    
                    // Unobserve after triggering animation
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    
    // Start observing the statistics section
    const statsSection = document.getElementById('statistics');
    if (statsSection) {
        observer.observe(statsSection);
    }
}