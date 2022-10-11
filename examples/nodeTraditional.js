const axios = require("axios");

(async () => {
  const res = await axios({
    method: "GET",
    url: "http://localhost:8000/non-stream",
  });

  console.log('DATA ', res.data);
})();
