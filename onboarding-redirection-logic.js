// Function to get a specific cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    console.log('Checking for cookie:', name);
    if (parts.length === 2) {
        const cookieValue = parts.pop().split(';').shift();
        console.log('Cookie found:', name, '=', cookieValue);
        return cookieValue;
    }
    console.log('Cookie not found:', name);
    return null;
}

// Function to handle redirection based on the origin
function handleRedirection(path) {
    console.log('Handling redirection to:', path);
    const currentOrigin = window.location.origin;

    if (currentOrigin === 'https://server.wized.com') {
        console.log('Detected Wized server, using Wized navigation');
        window.Wized = window.Wized || [];
        window.Wized.push((Wized) => {
            Wized.data.n.path = path;
        });
    } else {
        console.log('Using standard navigation');
        window.location.href = path;
    }
}

// Main function to check auth and onboarding status
function checkAuthAndOnboarding() {
    console.log('Checking authentication and onboarding status...');
    
    const authToken = getCookie('auth_token');
    
    if (!authToken) {
        console.log('User is not authenticated, redirecting to login');
        handleRedirection('/auth/login');
        return;
    }

    console.log('User is authenticated, checking onboarding status');
    const onboardingStatus = localStorage.getItem('onboarding-status');
    console.log('Onboarding status:', onboardingStatus);

    if (onboardingStatus === 'true') {
        console.log('Onboarding is incomplete, redirecting to dashboard');
        handleRedirection('/dashboard/home');
    } else {
        console.log('Onboarding is complete, keeping user on current page');
    }
}

// Run the check immediately
checkAuthAndOnboarding();
