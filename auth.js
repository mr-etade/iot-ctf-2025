// auth.js - Authentication system for CMN322 CTF Event 2025
// Western Pacific University - Internet of Things

const CLASS_PASSWORDS = {
    'CMN322': 'cmn322_iot_2025'
};

/**
 * Authenticate user for a specific class
 * @param {string} className - The class code (e.g., 'CMN322')
 * @returns {boolean} - True if authentication successful, false otherwise
 */
function authenticateClass(className) {
    // Check if already authenticated (valid for session)
    const authData = JSON.parse(sessionStorage.getItem(`auth_${className}`) || '{}');
    
    if (authData.authenticated) {
        // Check if authentication is still valid (24 hours)
        const hoursSinceAuth = (Date.now() - authData.timestamp) / (1000 * 60 * 60);
        if (hoursSinceAuth < 24) {
            return true;
        } else {
            // Session expired
            sessionStorage.removeItem(`auth_${className}`);
        }
    }
    
    // Prompt for password
    const password = prompt(`🔐 Enter password for ${className}:\n\n(Contact Mr. Eremas Tade if you need access)`);
    
    // Check if user cancelled
    if (password === null) {
        return false;
    }
    
    // Validate password
    if (password === CLASS_PASSWORDS[className]) {
        // Store authentication with timestamp
        sessionStorage.setItem(`auth_${className}`, JSON.stringify({
            authenticated: true,
            timestamp: Date.now(),
            className: className
        }));
        
        // Show success message
        console.log(`✅ Authentication successful for ${className}`);
        return true;
    } else {
        // Wrong password
        alert('❌ Incorrect password!\n\nPlease contact your instructor if you need access to the CTF challenges.');
        return false;
    }
}

/**
 * Check if user is authenticated for a class
 * @param {string} className - The class code to check
 * @returns {boolean} - True if authenticated and valid, false otherwise
 */
function checkClassAuth(className) {
    const authData = JSON.parse(sessionStorage.getItem(`auth_${className}`) || '{}');
    
    if (!authData.authenticated) {
        alert('🔒 Authentication required!\n\nRedirecting to home page...');
        return false;
    }
    
    // Check if authentication expired (24 hours)
    const hoursSinceAuth = (Date.now() - authData.timestamp) / (1000 * 60 * 60);
    if (hoursSinceAuth >= 24) {
        alert('⏰ Session expired!\n\nPlease authenticate again.');
        sessionStorage.removeItem(`auth_${className}`);
        return false;
    }
    
    return true;
}

/**
 * Logout user from a specific class
 * @param {string} className - The class code to logout from
 */
function logoutClass(className) {
    sessionStorage.removeItem(`auth_${className}`);
    
    // Also clear any solved challenges
    localStorage.removeItem(`${className}_solved`);
    
    alert('👋 Logged out successfully!\n\nYour progress has been cleared.');
    window.location.href = 'index.html';
}

/**
 * Get authentication status for a class
 * @param {string} className - The class code to check
 * @returns {object} - Authentication details
 */
function getAuthStatus(className) {
    const authData = JSON.parse(sessionStorage.getItem(`auth_${className}`) || '{}');
    
    if (!authData.authenticated) {
        return {
            authenticated: false,
            timeRemaining: 0
        };
    }
    
    const hoursSinceAuth = (Date.now() - authData.timestamp) / (1000 * 60 * 60);
    const hoursRemaining = Math.max(0, 24 - hoursSinceAuth);
    
    return {
        authenticated: hoursRemaining > 0,
        timeRemaining: hoursRemaining,
        className: authData.className,
        loginTime: new Date(authData.timestamp).toLocaleString()
    };
}

/**
 * Extend authentication session (refresh timestamp)
 * @param {string} className - The class code to extend
 */
function extendSession(className) {
    const authData = JSON.parse(sessionStorage.getItem(`auth_${className}`) || '{}');
    
    if (authData.authenticated) {
        authData.timestamp = Date.now();
        sessionStorage.setItem(`auth_${className}`, JSON.stringify(authData));
        console.log(`🔄 Session extended for ${className}`);
    }
}

// Auto-extend session on user activity
let activityTimer;
function setupActivityMonitoring(className) {
    const events = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
        document.addEventListener(event, () => {
            clearTimeout(activityTimer);
            activityTimer = setTimeout(() => {
                const status = getAuthStatus(className);
                if (status.authenticated && status.timeRemaining < 23) {
                    extendSession(className);
                }
            }, 5000); // Extend after 5 seconds of activity
        });
    });
}

// Initialize activity monitoring when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a challenge page
    const urlParams = new URLSearchParams(window.location.search);
    const currentClass = urlParams.get('class') || 'CMN322';
    
    if (window.location.pathname.includes('cmn322.html')) {
        setupActivityMonitoring(currentClass);
    }
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        authenticateClass,
        checkClassAuth,
        logoutClass,
        getAuthStatus,
        extendSession
    };
}