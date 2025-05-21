// Navigation functionality
// Dropdown functionality
function initializeDropdowns() {
    // Time period dropdown
    const timeDropdown = document.querySelector('select');
    const timeDropdownIcon = timeDropdown?.nextElementSibling;

    timeDropdown?.addEventListener('change', (e) => {
        updateTrendData(e.target.value);
    });

    timeDropdown?.addEventListener('focus', () => {
        timeDropdownIcon?.classList.add('text-purple-600');
    });

    timeDropdown?.addEventListener('blur', () => {
        timeDropdownIcon?.classList.remove('text-purple-600');
    });

    // Resources dropdown
    const resourcesDropdown = document.querySelector('.group');
    const dropdownContent = resourcesDropdown?.querySelector('.group-hover\\:block');

    if (resourcesDropdown && dropdownContent) {
        resourcesDropdown.addEventListener('click', (e) => {
            dropdownContent.classList.toggle('hidden');
            e.stopPropagation();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdownContent.classList.add('hidden');
        });

        // Keyboard navigation
        const dropdownLinks = dropdownContent.querySelectorAll('a');
        resourcesDropdown.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdownContent.classList.toggle('hidden');
            } else if (e.key === 'Escape') {
                dropdownContent.classList.add('hidden');
            }
        });

        dropdownLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    dropdownContent.classList.add('hidden');
                    resourcesDropdown.focus();
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDropdowns();
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const mobileMenuNav = document.querySelector('.hidden.md\\:flex');

    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
        mobileMenu.classList.toggle('flex-col');
        mobileMenu.classList.toggle('absolute');
        mobileMenu.classList.toggle('top-16');
        mobileMenu.classList.toggle('left-0');
        mobileMenu.classList.toggle('right-0');
        mobileMenu.classList.toggle('bg-purple-700');
        mobileMenu.classList.toggle('p-4');
    });

    // Login/Signup buttons
    const loginBtn = document.querySelector('button:contains("Login")');
    const signupBtn = document.querySelector('button:contains("Sign Up Free")');

    loginBtn?.addEventListener('click', () => {
        // Add your login logic here
        console.log('Login clicked');
    });

    signupBtn?.addEventListener('click', () => {
        // Add your signup logic here
        console.log('Signup clicked');
    });

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.md\:hidden');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
mobileMenuClose?.addEventListener('click', toggleMobileMenu);
mobileMenuOverlay?.addEventListener('click', toggleMobileMenu);

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileMenu();
    });
});

// Responsive chart resizing
let charts = [];

function initializeCharts() {
    const trendCtx = document.getElementById('trendChart')?.getContext('2d');
    const ageCtx = document.getElementById('ageChart')?.getContext('2d');
    const genderCtx = document.getElementById('genderChart')?.getContext('2d');

    if (trendCtx) {
        charts.push(new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Trend Growth',
                    data: [65, 78, 90, 120, 160, 185, 220],
                    borderColor: '#6e8efb',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(110, 142, 251, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        }));
    }

    if (ageCtx) {
        charts.push(new Chart(ageCtx, {
            type: 'doughnut',
            data: {
                labels: ['18-24', '25-34', '35-44', '45+'],
                datasets: [{
                    data: [30, 40, 20, 10],
                    backgroundColor: ['#6e8efb', '#a777e3', '#be6edd', '#d367d8']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12
                        }
                    }
                }
            }
        }));
    }

    if (genderCtx) {
        charts.push(new Chart(genderCtx, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female', 'Other'],
                datasets: [{
                    data: [45, 45, 10],
                    backgroundColor: ['#6e8efb', '#a777e3', '#be6edd']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12
                        }
                    }
                }
            }
        }));
    }
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCharts);

// Handle responsive chart resizing
window.addEventListener('resize', () => {
    charts.forEach(chart => {
        chart.resize();
    });
});

// Handle trend filters scrolling on mobile
const trendFiltersScroll = document.querySelector('.trend-filters');
let isScrolling = false;
let startX;
let scrollLeft;

if (trendFilters) {
    trendFilters.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - trendFilters.offsetLeft;
        scrollLeft = trendFilters.scrollLeft;
    });

    trendFilters.addEventListener('mouseleave', () => {
        isScrolling = false;
    });

    trendFilters.addEventListener('mouseup', () => {
        isScrolling = false;
    });

    trendFilters.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - trendFilters.offsetLeft;
        const walk = (x - startX) * 2;
        trendFilters.scrollLeft = scrollLeft - walk;
    });
}

    // Platform filter buttons
    const platformButtons = document.querySelectorAll('.flex.space-x-2 button');
    platformButtons.forEach(button => {
        button.addEventListener('click', () => {
            platformButtons.forEach(btn => {
                btn.classList.remove('bg-purple-100', 'text-purple-700');
                btn.classList.add('bg-gray-100', 'text-gray-700');
            });
            button.classList.remove('bg-gray-100', 'text-gray-700');
            button.classList.add('bg-purple-100', 'text-purple-700');
            // Add your filter logic here
            const platform = button.textContent.trim();
            filterTrendsByPlatform(platform);
        });
    });

    // Time period selector
    const timeSelector = document.querySelector('select:contains("Last 24 hours")');
    timeSelector?.addEventListener('change', (e) => {
        // Add your time period filter logic here
        console.log('Time period changed:', e.target.value);
        updateTrendData(e.target.value);
    });

    // Refresh button
    const refreshBtn = document.querySelector('button:contains("Refresh")');
    // Refresh button functionality
    document.getElementById('refreshButton').addEventListener('click', function() {
        location.reload();
    });
    
    // Trend filter functionality
    const trendFilters = document.querySelectorAll('.trend-filter');
    const timeFilter = document.getElementById('timeFilter');
    
    function updateTrends(platform = 'all', timeRange = '24h') {
        // Reset all filter button styles
        trendFilters.forEach(button => {
            button.classList.remove('bg-purple-100', 'text-purple-700');
            button.classList.add('bg-gray-100', 'text-gray-700');
        });
    
        // Highlight active filter
        const activeButton = document.querySelector(`[data-filter="${platform}"]`);
        activeButton.classList.remove('bg-gray-100', 'text-gray-700');
        activeButton.classList.add('bg-purple-100', 'text-purple-700');
    
        // Here you would typically fetch new trends data from your backend
        // For now, we'll just show a loading state
        const trendContainer = document.querySelector('.divide-y.divide-gray-200');
        trendContainer.innerHTML = '<div class="p-4 text-center">Loading latest trends...</div>';
    
        // Simulate API call with setTimeout
        setTimeout(() => {
            // In a real application, this would be replaced with actual API data
            trendContainer.innerHTML = `<div class="p-4">Showing latest ${platform} trends for the last ${timeRange}</div>`;
        }, 1000);
    }
    
    // Add click event listeners to trend filters
    trendFilters.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-filter');
            const timeRange = timeFilter.value;
            updateTrends(platform, timeRange);
        });
    });
    
    // Add change event listener to time filter
    timeFilter.addEventListener('change', function() {
        const platform = document.querySelector('.trend-filter.bg-purple-100').getAttribute('data-filter');
        updateTrends(platform, this.value);
    });
    
    // Initialize with default values
    document.addEventListener('DOMContentLoaded', function() {
        updateTrends('all', '24h');
    });
    // Save idea buttons
    const saveButtons = document.querySelectorAll('button:contains("Save")');
    saveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.content-idea-card');
            // Add your save logic here
            console.log('Saving idea:', card.querySelector('h3').textContent);
            button.innerHTML = '<i class="fas fa-bookmark mr-1"></i> Saved';
        });
    });
});

// Helper functions
function filterTrendsByPlatform(platform) {
    const trendItems = document.querySelectorAll('.divide-y.divide-gray-200 > div');
    
    trendItems.forEach(item => {
        const platformIcon = item.querySelector('.platform-badge i');
        const itemPlatform = platformIcon.className.includes('twitter') ? 'twitter'
            : platformIcon.className.includes('instagram') ? 'instagram'
            : platformIcon.className.includes('tiktok') ? 'tiktok'
            : platformIcon.className.includes('youtube') ? 'youtube' : '';
        
        if (platform === 'all' || itemPlatform === platform) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function updateTrendData(timePeriod) {
    // Implement your trend data update logic here
    console.log('Updating trend data for:', timePeriod);
}

function refreshTrendData() {
    // Implement your refresh logic here
    console.log('Refreshing trend data...');
}