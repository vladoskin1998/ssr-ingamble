// Critical LCP Image Preloading Script
// Aggressively preloads the first above-the-fold image to minimize LCP

(function() {
    'use strict';
    
    // Run immediately on script load
    function preloadCriticalImages() {
        // Critical image selectors most likely to be LCP
        const criticalImageSelectors = [
            '.casino-big-card:first-child .casino-big-card__image img',
            '.casino-card:first-child .casino-card__image img',
            '.main-casino-info__image-block img',
            '.casino-big-card__image img'
        ];
        
        criticalImageSelectors.forEach(selector => {
            const img = document.querySelector(selector);
            if (img && img.src) {
                // Create preload link for the first critical image
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                preloadLink.href = img.src;
                preloadLink.fetchPriority = 'high';
                
                // Add responsive image hints if srcset exists
                if (img.srcset) {
                    preloadLink.imagesrcset = img.srcset;
                }
                if (img.sizes) {
                    preloadLink.imagesizes = img.sizes;
                }
                
                // Insert at the top of head for immediate processing
                document.head.insertBefore(preloadLink, document.head.firstChild);
                
                // Only preload the first critical image
                return;
            }
        });
    }
    
    // Run immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preloadCriticalImages);
    } else {
        preloadCriticalImages();
    }
})();
