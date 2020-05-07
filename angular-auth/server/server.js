const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3000;
const api = require("./routes/api");
const password = require("./routes/password");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", api);
app.use("/api", password)
app.get("/", function (req, res) {
  res.send("Hello from server");
});

app.listen(PORT, function () {
  console.log("Server running on localhost: " + PORT);
});
