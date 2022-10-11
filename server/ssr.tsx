import { RequestHandler } from "express";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";

import App from "../src/App";
import { Writable } from "node:stream";
import { DataProvider, createServerData } from "../src/dataLoader";

const startHtml = `
<!DOCTYPE HTML>
<html>
<head>
<script async src="index.js"></script>
</head>
<body>
<div id="root">`;

const closeHtml = "</div></body></html>";

const render: RequestHandler = (req, res, next) => {
  // fake fetching data
  const data = createServerData();

  // SSR Stream rendering
  const stream = new Writable({
    write(chunk, _encoding, cb) {
      console.log("WRITE CHUNK");
      res.write(chunk, cb); // write chunk to response
    },
    final() {
      console.log("END STREAM");
      res.end(closeHtml); // write close html to response
    },
  });

  // https://reactjs.org/docs/react-dom-server.html#rendertopipeablestream
  const { pipe } = renderToPipeableStream(
    <DataProvider data={data}>
      <App />
    </DataProvider>,
    {
      onShellReady() {
        console.log("shell ready");

        // Set headers for streaming
        res.setHeader("Content-Type", "text/html; charset=utf-8");

        res.write(startHtml); // write start HTML
        pipe(stream);
      },
      onAllReady() {
        console.log("all ready");
      },
      onError(x) {
        console.error(x);
      },
    }
  );
};

export default render;
