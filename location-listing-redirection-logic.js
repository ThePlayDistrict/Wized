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

// Function to check for listing_id parameter
function checkListingIdParameter() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('listing_id');
    
    // If listing_id doesn't exist, redirect to /our-districts
    if (!listingId) {
        handleRedirection('/our-districts');
    }
}

// Run the check immediately
checkListingIdParameter();
