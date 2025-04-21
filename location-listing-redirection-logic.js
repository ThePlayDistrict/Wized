// Function to handle redirection based on the origin
function handleRedirection(path) {
  const currentOrigin = window.location.origin;

  if (currentOrigin === "https://server.wized.com") {
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
  const currentOrigin = window.location.origin;

  if (currentOrigin === "https://server.wized.com") {
    // For Wized environment, check n.parameter
    window.Wized = window.Wized || [];
    window.Wized.push((Wized) => {
      if (!Wized.data.n.parameter.listing_id) {
        handleRedirection("/our-districts");
      }
    });
  } else {
    // For non-Wized environment, check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get("listing_id");

    if (!listingId) {
      handleRedirection("/our-districts");
    }
  }
}

// Run the check immediately
checkListingIdParameter();
