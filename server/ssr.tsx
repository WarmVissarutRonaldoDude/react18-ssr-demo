import { RequestHandler } from "express";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";

import App from "../src/App";
import { Writable } from "node:stream";

const frontHTML = `
<!DOCTYPE HTML>
<html>
<head>
<script async src="index.js"></script>
</head>
<body>
<div id="root">`;

const backHtml = "</div></body></html>";

const render: RequestHandler = (req, res, next) => {
  // SSR Stream rendering
  const stream = new Writable({
    write(chunk, _encoding, cb) {
      res.write(chunk, cb);
    },
    final() {
      console.log("END STREAM")
      res.end(backHtml);
    },
  });
  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady() {
      console.log("shell ready");
      // Set headers for streaming
      res.setHeader("Content-Type", "text/html; charset=utf-8");

      // Write front HTML
      res.write(frontHTML);
      pipe(stream);
    },
    onAllReady() {
      console.log("all ready");
    },
    onError(x) {
      console.error(x);
    },
  });
};

export default render;
