// Navigation function to switch between screens
function navigateTo(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        // Scroll to top of the new screen
        window.scrollTo(0, 0);
    }
}

// Tab switching function
function switchTab(screen, tabName) {
    if (screen === 'crop') {
        // Crop Advisor tabs
        const suggestionsTab = document.getElementById('crop-suggestions');
        const fertilizerTab = document.getElementById('crop-fertilizer');
        const tabButtons = document.querySelectorAll('#crop-screen .tab-button');
        
        if (tabName === 'suggestions') {
            suggestionsTab.classList.remove('hidden');
            fertilizerTab.classList.add('hidden');
            tabButtons[0].classList.add('active');
            tabButtons[1].classList.remove('active');
        } else if (tabName === 'fertilizer') {
            suggestionsTab.classList.add('hidden');
            fertilizerTab.classList.remove('hidden');
            tabButtons[0].classList.remove('active');
            tabButtons[1].classList.add('active');
        }
    } else if (screen === 'help') {
        // Help & Support tabs
        const botTab = document.getElementById('help-bot');
        const helplinesTab = document.getElementById('help-helplines');
        const tabButtons = document.querySelectorAll('#help-screen .tab-button');
        
        if (tabName === 'bot') {
            botTab.classList.remove('hidden');
            helplinesTab.classList.add('hidden');
            tabButtons[0].classList.add('active');
            tabButtons[1].classList.remove('active');
        } else if (tabName === 'helplines') {
            botTab.classList.add('hidden');
            helplinesTab.classList.remove('hidden');
            tabButtons[0].classList.remove('active');
            tabButtons[1].classList.add('active');
        }
    }
}

// Initialize app on load
document.addEventListener('DOMContentLoaded', function() {
    // Ensure home screen is visible on load
    navigateTo('home-screen');
    
    // Add click handlers to action buttons (for demo purposes)
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('This is a prototype. In the full application, this would navigate to the application form.');
        });
    });
});

// Add smooth scrolling behavior
window.addEventListener('load', function() {
    document.documentElement.style.scrollBehavior = 'smooth';
});