// Function to check if a cookie exists
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop().split(';').shift();
        return cookieValue;
    }
    return null;
}

// Function to handle visibility based on authentication
function handleAuthVisibility() {
    const authToken = getCookie('auth_token');

    // First, ensure all auth-visibility elements start hidden
    const allAuthElements = document.querySelectorAll('[auth-visibility]');
    allAuthElements.forEach(element => {
        element.style.display = 'none';
    });

    if (!authToken) {
        // Target elements visible for unauthenticated users
        const unauthenticatedElements = document.querySelectorAll('[auth-visibility="unauthenticated"]');
        unauthenticatedElements.forEach((element, index) => {
            if (element.hasAttribute('custom-cloak')) {
                element.removeAttribute('custom-cloak');
                element.style.display = 'block';
            }
        });
    } else {
        // Target elements visible for authenticated users
        const authenticatedElements = document.querySelectorAll('[auth-visibility="authenticated"]');
        authenticatedElements.forEach((element, index) => {
            if (element.hasAttribute('custom-cloak')) {
                element.removeAttribute('custom-cloak');
                element.style.display = 'block';
            }
        });
    }
}

// Run visibility handler immediately
handleAuthVisibility();
