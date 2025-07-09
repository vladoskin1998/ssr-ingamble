// Footer CLS Prevention Script
// Shows footer only after main content has loaded to prevent layout shifts
// Модифіковано для роботи з React гідратацією

(function() {
    'use strict';
    
    // Використовуємо унікальні класи, які не будуть конфліктувати з гідратацією
    function showFooter() {
        // Запускаємо з затримкою, щоб дати React закінчити гідратацію
        setTimeout(function() {
            document.body.classList.add('footer-visible');
            document.documentElement.classList.add('footer-visible');
            
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.classList.add('footer-visible');
            }
        }, 50);
    }
    
    function checkContentLoaded() {
        // Check if main content exists and has substantial height
        const mainContent = document.querySelector('.main-page, .casino-page, .bonuses-page, [class*="page"], .main-gamble, main, .gamble__body > *:not(.footer)');
        
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
    setTimeout(showFooter, 500);
    
    // Check periodically for content load (faster checks)
    let checkCount = 0;
    const checkInterval = setInterval(function() {
        checkCount++;
        
        if (checkContentLoaded() || checkCount > 15) {
            clearInterval(checkInterval);
        }
    }, 50);
    
    // Also check on window load
    window.addEventListener('load', function() {
        setTimeout(showFooter, 50);
    });
    
    // Check when React/Next.js hydration completes
    setTimeout(function() {
        if (window.React || window.__NEXT_DATA__) {
            showFooter();
        }
    }, 300);
    
})();
