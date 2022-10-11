import express from "express";
import serveStatic from "serve-static";
import ssrRequestHandler from "./ssr";
import nonStreamSsr from "./nonStreamSsr";

const app = express();
const router = express.Router();

// static
app.use(serveStatic("dist-client"));

router.use("/non-stream", nonStreamSsr);
router.use("/ssr-stream", ssrRequestHandler);

app.use(router);

app.listen(8000, () => {
  console.log(`Listen on port: ${8000}`);
  console.log("For non stream example : localhost:8000/non-stream");
  console.log("For stream example : localhost:8000/ssr-stream");
});
