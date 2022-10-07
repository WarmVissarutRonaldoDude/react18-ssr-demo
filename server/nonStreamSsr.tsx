import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";

function renderFullPage(html) {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My page</title>
          <script async src="index.js"></script>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </head>
        <body>
          <div id="root">${html}</div>
        </body>
      </html>
    `;
}

export default async function nonStreamSsr(req, res) {
  console.log("NON_STREAM SSR");

  if (App.loadAllData) {
    await App.loadAllData();
  }

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(<App />);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html));
}
