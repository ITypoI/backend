const express = require("express");
const app = express();

// db connection
require("./startup/db")();

// routes connection
require("./startup/routes")(app);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Listening to PORT :${port}`);
});
