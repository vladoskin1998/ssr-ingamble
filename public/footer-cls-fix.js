// Footer CLS Prevention Script
// Enhanced version for lazy-loaded footer with fallback
// Works with both lazy loading and visibility approach

(function() {
    'use strict';
    
    function showFooter() {
        setTimeout(function() {
            // For lazy-loaded footer
            const footerPlaceholder = document.querySelector('.footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.style.display = 'none';
            }
            
            // Fallback for traditional approach
            document.body.classList.add('footer-visible');
            document.documentElement.classList.add('footer-visible');
            
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.classList.add('footer-visible');
                footer.style.visibility = 'visible';
            }
        }, 50);
    }
    
    function checkContentLoaded() {
        // Check if main content exists and has substantial height
        const mainContent = document.querySelector('.main-page, .casino-page, .bonuses-page, [class*="page"], .main-gamble, main, .gamble__body > *:not(.footer):not(.footer-placeholder)');
        
        if (mainContent && mainContent.offsetHeight > 100) {
            showFooter();
            return true;
        }
        
        // Also check if there are loaded images or cards
        const hasContent = document.querySelectorAll('.casino-card, .bonus-card, .casino-item, img[src]').length > 0;
        if (hasContent) {
            showFooter();
            return true;
        }
        
        return false;
    }
    
    // Show immediately if content already exists
    if (checkContentLoaded()) {
        return;
    }
    
    // Check when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(checkContentLoaded, 20);
        });
    } else {
        setTimeout(checkContentLoaded, 20);
    }
    
    // Fallback: Show footer after reasonable delay
    setTimeout(showFooter, 1000);
    
    // Check periodically for content load
    let checkCount = 0;
    const checkInterval = setInterval(function() {
        checkCount++;
        
        if (checkContentLoaded() || checkCount > 20) {
            clearInterval(checkInterval);
        }
    }, 100);
    
    // Also check on window load
    window.addEventListener('load', function() {
        setTimeout(showFooter, 100);
    });
    
    // Check when React/Next.js hydration completes
    setTimeout(function() {
        if (window.React || window.__NEXT_DATA__) {
            showFooter();
        }
    }, 500);
    
})();
