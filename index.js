const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const config = require("config");
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const logger = require("./middleware/logger");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Error connecting to the database...", err));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(helmet());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
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
