// Function to get a specific cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop().split(';').shift();
        return cookieValue;
    }
    return null;
}

// Function to handle redirection based on the origin
function handleRedirection(path) {
    const currentOrigin = window.location.origin;

    if (currentOrigin === 'https://server.wized.com') {
        window.Wized = window.Wized || [];
        window.Wized.push((Wized) => {
            Wized.data.n.path = path;
        });
    } else {
        window.location.href = path;
    }
}

// Main function to check auth and onboarding status
function checkAuthAndOnboarding() {
    
    const authToken = getCookie('auth_token');
    
    if (!authToken) {
        handleRedirection('/auth/login');
        return;
    }

    const onboardingStatus = localStorage.getItem('onboarding-status');

    if (onboardingStatus === 'true') {
        handleRedirection('/dashboard/home');
    } else {
    }
}

// Run the check immediately
checkAuthAndOnboarding();
