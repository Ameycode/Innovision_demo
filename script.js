/* ============================================
   INNOVISION 2K26 - COMING SOON PAGE
   JavaScript - Countdown Timer Logic
   ============================================ */

/**
 * INNOVISION 2K26 - Countdown Timer
 * 
 * This script manages:
 * - Countdown timer calculation and updates
 * - Real-time display updates (every second)
 * - CTA button interactions
 * - Data validation and error prevention
 */

// ============================================
// 1. CONFIGURATION
// ============================================

// Event date: January 17, 2026 at 10:00 AM
// Modify this date as needed for your event
const EVENT_DATE = new Date('2026-01-17T10:00:00').getTime();

// Update interval (in milliseconds) - 1000ms = 1 second
const UPDATE_INTERVAL = 1000;

// ============================================
// 2. COUNTDOWN TIMER CLASS
// ============================================

class CountdownTimer {
    /**
     * Initialize the countdown timer
     * @param {number} targetDate - Target date/time in milliseconds
     */
    constructor(targetDate) {
        this.targetDate = targetDate;
        this.timerInterval = null;
        
        // Cache DOM elements for better performance
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        
        this.validateElements();
    }

    /**
     * Validate that all required DOM elements exist
     */
    validateElements() {
        const elements = [
            this.daysElement,
            this.hoursElement,
            this.minutesElement,
            this.secondsElement
        ];

        if (elements.some(el => el === null)) {
            console.error('ERROR: One or more countdown timer elements not found in DOM');
        }
    }

    /**
     * Calculate time remaining until target date
     * @returns {Object} Object containing days, hours, minutes, seconds
     */
    calculateTimeRemaining() {
        const now = new Date().getTime();
        const timeRemaining = this.targetDate - now;

        // Prevent negative values - event has passed or is happening now
        if (timeRemaining <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                isExpired: true
            };
        }

        // Convert milliseconds to time units
        const totalSeconds = Math.floor(timeRemaining / 1000);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        return {
            days,
            hours,
            minutes,
            seconds,
            isExpired: false
        };
    }

    /**
     * Format a number to always show two digits (e.g., 5 becomes 05)
     * @param {number} num - Number to format
     * @returns {string} Formatted number with leading zero if needed
     */
    formatNumber(num) {
        return String(num).padStart(2, '0');
    }

    /**
     * Update the countdown display with current time remaining
     */
    updateDisplay() {
        const timeRemaining = this.calculateTimeRemaining();

        // Update DOM elements with formatted values
        this.daysElement.textContent = this.formatNumber(timeRemaining.days);
        this.hoursElement.textContent = this.formatNumber(timeRemaining.hours);
        this.minutesElement.textContent = this.formatNumber(timeRemaining.minutes);
        this.secondsElement.textContent = this.formatNumber(timeRemaining.seconds);

        // Handle expired event
        if (timeRemaining.isExpired) {
            this.handleExpiredEvent();
        }
    }

    /**
     * Handle event when countdown expires
     */
    handleExpiredEvent() {
        console.log('Event date reached!');
        
        // Stop the timer
        this.stop();
        
        // Update UI to reflect event has started
        const comingSoonElement = document.querySelector('.coming-soon h2');
        if (comingSoonElement) {
            comingSoonElement.textContent = 'Event Started!';
        }

        // Optional: Disable the notify button
        const notifyBtn = document.getElementById('notify-btn');
        if (notifyBtn) {
            notifyBtn.disabled = true;
            notifyBtn.textContent = 'Event Live';
            notifyBtn.style.opacity = '0.6';
            notifyBtn.style.cursor = 'not-allowed';
        }
    }

    /**
     * Start the countdown timer
     * Updates display immediately and then every UPDATE_INTERVAL milliseconds
     */
    start() {
        // Immediate update on start
        this.updateDisplay();

        // Set up interval for continuous updates
        this.timerInterval = setInterval(() => {
            this.updateDisplay();
        }, UPDATE_INTERVAL);

        console.log('Countdown timer started. Target date:', new Date(this.targetDate));
    }

    /**
     * Stop the countdown timer
     */
    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            console.log('Countdown timer stopped');
        }
    }

    /**
     * Reset the timer (useful for debugging or restarting)
     */
    reset() {
        this.stop();
        this.start();
    }
}

// ============================================
// 3. CTA BUTTON FUNCTIONALITY
// ============================================

/**
 * Initialize CTA button click handlers
 */
function initializeCTAButtons() {
    const sponsorsBtn = document.getElementById('sponsors-btn');

    if (!sponsorsBtn) {
        console.error('ERROR: Sponsors button element not found');
        return;
    }

    // Add click event listener for Sponsors button
    sponsorsBtn.addEventListener('click', handleSponsorsClick);

    // Optional: Add keyboard accessibility
    sponsorsBtn.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleSponsorsClick();
        }
    });
}

/**
 * Handle "View Sponsors" button click
 */
function handleSponsorsClick() {
    const btn = document.getElementById('sponsors-btn');
    console.log('User clicked "View Sponsors" button');
    
    // Show alert for now - replace with modal or redirect
    alert('Sponsor information coming soon!');
    
    // Optional: Redirect to sponsors page when available
    // window.location.href = '#sponsors';
}

// ============================================
// 4. PAGE INITIALIZATION
// ============================================

/**
 * Initialize all components when DOM is ready
 */
function initializeApp() {
    console.log('🚀 Initializing INNOVISION 2K26 Coming Soon Page');

    // Create and start the countdown timer
    const timer = new CountdownTimer(EVENT_DATE);
    timer.start();

    // Initialize CTA buttons
    initializeCTAButtons();

    console.log('✅ Application initialized successfully');

    // Optional: Expose timer to global scope for debugging
    // window.innovisionTimer = timer;
}

/**
 * Wait for DOM to be fully loaded before initializing
 */
if (document.readyState === 'loading') {
    // DOM is still loading
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}

// ============================================
// 5. ERROR HANDLING & DEBUGGING
// ============================================

/**
 * Global error handler for debugging
 */
window.addEventListener('error', (event) => {
    console.error('❌ Global Error:', event.error);
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled Promise Rejection:', event.reason);
});

// ============================================
// 6. CLEANUP (Optional)
// ============================================

/**
 * Clean up when user leaves the page
 * Prevents memory leaks and unnecessary intervals
 */
window.addEventListener('beforeunload', () => {
    // Stop all timers
    const allIntervals = window.setInterval(() => {}, 1000);
    window.clearInterval(allIntervals);
});
