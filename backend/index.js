const express = require("express");
require("dotenv").config({ path: "./.env" });
const MongoConnect = require("./src/database/db");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
console.log(port);

MongoConnect();
//const port=2002;
app.use(express.json({ limit: "10mb" })); // Increase the JSON body size limit
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase for URL-encoded data

app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", require("./src/routes/auth_route"));
app.use("/employee", require("./src/routes/emp_route"));
//app.use("/search",require("./src/routes/trip_route"));

app.listen(port, () => {
  console.log("Server Started");
});
