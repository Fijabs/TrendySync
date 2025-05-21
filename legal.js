// Cookie consent management
const cookieConsent = {
    init() {
        this.banner = document.getElementById('cookie-consent');
        this.acceptButton = document.getElementById('accept-cookies');
        this.customizeButton = document.getElementById('customize-cookies');
        this.cookieSettings = document.getElementById('cookie-settings');

        this.loadPreferences();
        this.bindEvents();
    },

    bindEvents() {
        if (this.acceptButton) {
            this.acceptButton.addEventListener('click', () => this.acceptAll());
        }

        if (this.customizeButton) {
            this.customizeButton.addEventListener('click', () => this.showSettings());
        }

        if (this.cookieSettings) {
            this.cookieSettings.addEventListener('click', () => this.showSettings());
        }
    },

    loadPreferences() {
        const preferences = localStorage.getItem('cookiePreferences');
        if (preferences) {
            this.hideBanner();
        }
    },

    acceptAll() {
        const preferences = {
            essential: true,
            analytics: true,
            marketing: true,
            preferences: true,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        this.hideBanner();
    },

    showSettings() {
        // Implement a modal or redirect to cookie settings page
        window.location.href = 'cookie-policy.html#settings';
    },

    hideBanner() {
        if (this.banner) {
            this.banner.classList.add('hidden');
            // Remove the element from DOM after animation completes
            setTimeout(() => {
                this.banner.style.display = 'none';
            }, 300);
        }
    }
};

// Footer navigation highlighting
const footerNav = {
    init() {
        this.highlightCurrentPage();
    },

    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const footerLinks = document.querySelectorAll('.footer-links a');
        
        footerLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath.endsWith(linkPath)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

// Initialize functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    cookieConsent.init();
    footerNav.init();
});