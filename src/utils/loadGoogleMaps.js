// Utility to dynamically load the Google Maps JavaScript API
// Returns a Promise that resolves when the API is ready.

export default function loadGoogleMaps() {
  // If the API is already loaded, resolve immediately
  if (window.google && window.google.maps) {
    return Promise.resolve();
  }

  // Avoid injecting multiple script tags
  if (document.getElementById('google-maps-script')) {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById('google-maps-script');
      
      // If window.google.maps is already defined, resolve
      if (window.google && window.google.maps) {
        resolve();
        return;
      }
      
      // Poll until window.google.maps is defined or script errors
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 50);

      existingScript.addEventListener('error', () => {
        clearInterval(checkInterval);
        reject(new Error('Failed to load Google Maps script'));
      });
    });
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  // A valid Google Maps API Key must start with 'AIzaSy'
  const isValidKey = apiKey && apiKey.trim() !== '' && apiKey.startsWith('AIzaSy');

  return new Promise((resolve, reject) => {
    const callbackName = 'initGoogleMapsCallback';
    window[callbackName] = () => {
      delete window[callbackName];
      resolve();
    };

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?${isValidKey ? `key=${apiKey}&` : ''}libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      delete window[callbackName];
      reject(new Error('Failed to load Google Maps script'));
    };

    document.head.appendChild(script);
  });
}
