// BGU Digital Library - Main JavaScript Functions

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        console.log(`Searching for: "${searchTerm}"`);
        // In real implementation, redirect to search results
        window.location.href = `pages/search-results.html?q=${encodeURIComponent(searchTerm)}`;
    }
}

function browseCollection(collectionType) {
    const collections = {
        'faculty': 'Faculty Publications',
        'theses': 'Theses & Dissertations',
        'conference': 'Conference Proceedings',
        'reports': 'Research Reports',
        'books': 'Books & Monographs'
    };
    
    console.log(`Browsing: ${collections[collectionType]}`);
    // In real implementation, redirect to collection page
    window.location.href = `pages/collections.html?type=${collectionType}`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Search on Enter key
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Smooth hover effects for collection items
    document.querySelectorAll('.collection-item').forEach((item, index) => {
        item.style.setProperty('--delay', index + 1);
    });

    // Add click handlers for navigation
    setupNavigation();
});

function setupNavigation() {
    // Handle sidebar links
    document.querySelectorAll('.sidebar-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            console.log(`Navigating to: ${href}`);
            // Implement navigation logic here
        });
    });

    // Handle subject area clicks
    document.querySelectorAll('.sidebar-item a[href^="#subject"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const subject = this.textContent.trim();
            console.log(`Browsing subject: ${subject}`);
            // Redirect to subject-specific browse page
            window.location.href = `pages/browse.html?subject=${encodeURIComponent(subject)}`;
        });
    });

    // Handle author clicks
    document.querySelectorAll('.sidebar-item a[href^="#author"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const author = this.textContent.trim();
            console.log(`Browsing author: ${author}`);
            // Redirect to author-specific page
            window.location.href = `pages/browse.html?author=${encodeURIComponent(author)}`;
        });
    });
}

// Utility functions
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add animation keyframes dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animation styles
addAnimationStyles();

// Analytics tracking (placeholder)
function trackEvent(category, action, label = '') {
    console.log(`Analytics: ${category} - ${action} - ${label}`);
    // Implement your analytics tracking here (Google Analytics, etc.)
}

// Track search events
function trackSearch(query) {
    trackEvent('Search', 'Query', query);
}

// Track collection browsing
function trackCollectionBrowse(collection) {
    trackEvent('Browse', 'Collection', collection);
}

// Export functions for other modules
window.bguLibrary = {
    performSearch,
    browseCollection,
    showNotification,
    trackEvent,
    trackSearch,
    trackCollectionBrowse
}