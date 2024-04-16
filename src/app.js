require("./database/db");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: true,
  })
);

// Configuración de CORS para permitir solicitudes desde el origen de tu frontend
app.use(
  cors({
    origin: "https://aroma-cafe-cliente.onrender.com",
  })
);

app.use(express());
app.use(express.json());
app.use(morgan());
app.use(cors());

app.use("/", routes);

module.exports = app;
