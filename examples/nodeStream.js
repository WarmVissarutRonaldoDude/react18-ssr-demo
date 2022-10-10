const axios = require("axios");

(async () => {
  const res = await axios({
    method: "GET",
    url: "http://localhost:8000/ssr-stream",
    responseType: "stream",
  });

  const stream = res.data;

  stream.on("data", (data) => {
    console.log("STREAM DATA ", data.toString()); // Buffer to string
    // new line
    console.log("");
  });

  stream.on("end", () => {
    console.log("STREAM END");
  });
})();
