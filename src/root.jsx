const scriptElement = document.createElement('script');

// The app loads when this is set to app-a.js
scriptElement.src = 'app-b.js';

document.getElementById('root').appendChild(scriptElement);
