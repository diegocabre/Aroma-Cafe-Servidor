require("./database/db");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const session = require("express-session");
/* const cors = require("cors");

app.use(
  cors({
    origin: "https://aroma-cafe-cliente.onrender.com",
  })
); */

const app = express();
app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express());
app.use(express.json());
app.use(morgan());
app.use(cors());

app.use("/", routes);

module.exports = app;
