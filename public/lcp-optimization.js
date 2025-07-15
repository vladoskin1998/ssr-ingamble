// LCP (Largest Contentful Paint) Optimization Script
// Optimizes loading and priority of critical casino images

(function() {
    'use strict';
    
    function optimizeCriticalImages() {
        // Critical selectors for above-the-fold images that could be LCP
        const criticalSelectors = [
            '.main-casino-info__image-block img',
            '.name-main-casino-info__logo img', 
            '.casino-big-card__image img',
            '.main-casino-info__image img'
        ];
        
        // Non-critical selectors for below-the-fold images
        const nonCriticalSelectors = [
            '.casino-card__image img',
            '.different-casino-big__image img',
            '.different-casino-medium__image img',
            '.casino-small-card__image img',
            '.info-casino-card__likes-icon img'
        ];
        
        // Optimize critical images (potential LCP candidates)
        criticalSelectors.forEach(selector => {
            const images = document.querySelectorAll(selector);
            images.forEach((img, index) => {
                // Only first few images need high priority
                if (index < 2) {
                    img.loading = 'eager';
                    img.fetchPriority = 'high';
                    img.decoding = 'sync';
                    
                    // Force immediate paint for first image
                    if (index === 0) {
                        img.style.transform = 'translateZ(0)';
                        img.style.willChange = 'auto';
                        img.style.backfaceVisibility = 'hidden';
                    }
                    
                    // Special handling for images from API
                    if (img.src && img.src.includes('ig-api-prod.incasinowetrust.com')) {
                        img.fetchPriority = 'high';
                        
                        // Add preload hint for the most critical image
                        if (index === 0) {
                            const link = document.createElement('link');
                            link.rel = 'preload';
                            link.href = img.src;
                            link.as = 'image';
                            link.fetchPriority = 'high';
                            document.head.appendChild(link);
                        }
                    }
                } else {
                    img.loading = 'lazy';
                    img.fetchPriority = 'low';
                }
            });
        });
        
        // Optimize non-critical images
        nonCriticalSelectors.forEach(selector => {
            const images = document.querySelectorAll(selector);
            images.forEach((img, index) => {
                // First 3 visible cards get eager loading, rest get lazy
                if (index < 3) {
                    img.loading = 'eager';
                    img.fetchPriority = 'auto';
                } else {
                    img.loading = 'lazy';
                    img.fetchPriority = 'low';
                }
                img.decoding = 'async';
            });
        });
    }
    
    function addResourceHints() {
        // Add DNS prefetch for the image CDN
        const dnsPrefetch = document.createElement('link');
        dnsPrefetch.rel = 'dns-prefetch';
        dnsPrefetch.href = '//ig-api-prod.incasinowetrust.com';
        document.head.appendChild(dnsPrefetch);
        
        // Add preconnect for faster connection
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = 'https://ig-api-prod.incasinowetrust.com';
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);
    }
    
    function observeImageLoad() {
        // Monitor LCP candidate images for performance
        const lcpCandidates = document.querySelectorAll('.main-casino-info__image-block img, .name-main-casino-info__logo img');
        
        lcpCandidates.forEach(img => {
            if (img.complete) {
                // Image already loaded
                return;
            }
            
            img.onload = function() {
                // Force repaint after critical image loads
                this.style.opacity = '0.999';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 0);
            };
            
            img.onerror = function() {
                // Fallback for failed images
            };
        });
    }
    
    function optimizeImageFormats() {
        // Check for WebP support and optimize accordingly
        const supportsWebP = (function() {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            return canvas.toDataURL('image/webp').indexOf('webp') > -1;
        })();
        
        if (supportsWebP) {
            document.documentElement.classList.add('webp-support');
        }
    }
    
    function runOptimizations() {
        addResourceHints();
        optimizeCriticalImages();
        observeImageLoad();
        optimizeImageFormats();
    }
    
    // Run immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runOptimizations);
    } else {
        runOptimizations();
    }
    
    // Re-run when new content is loaded (for dynamic content)
    const observer = new MutationObserver(function(mutations) {
        let shouldOptimize = false;
        
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && (
                        node.querySelector('img') || 
                        node.matches('img')
                    )) {
                        shouldOptimize = true;
                    }
                });
            }
        });
        
        if (shouldOptimize) {
            setTimeout(optimizeCriticalImages, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();
