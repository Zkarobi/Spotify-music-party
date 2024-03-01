import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app'; // Adjust the path as necessary

// Ensure this matches the ID of the div in your HTML file
const container = document.getElementById('app');

// Verify the container is not null to avoid errors
if (container !== null) {
    const root = createRoot(container); // Create a root.
    root.render(<App name="hello" />); // Render the App component with props
}
