const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const config = require("config");
const genres = require("./routes/genres");
const home = require("./routes/home");
const logger = require("./middleware/logger");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({
  extended: true
}));
app.use(helmet());
app.use("/api/genres", genres);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled....");
}

console.log("Application Name : " + config.get("name"));
console.log("Mail Server : " + config.get("mail.host"));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});