import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App.jsx';

try {
  console.log("Starting dry-run render test...");
  const html = ReactDOMServer.renderToString(React.createElement(App));
  console.log("Render test successful! Generated HTML length:", html.length);
} catch (error) {
  console.error("Render test failed with error:");
  console.error(error);
  process.exit(1);
}
