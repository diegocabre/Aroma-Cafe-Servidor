require("./database/db");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const session = require("express-session");

const app = express();

// Configuración de CORS para permitir solicitudes desde el origen de tu frontend
app.use(
  cors({
    origin: "https://aroma-cafe-cliente.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"], // Permitir otros métodos si es necesario
  })
);

// Configuración de sesiones
app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(morgan("dev")); // Utilizar 'dev' para mostrar logs en la consola
app.use("/", routes);

module.exports = app;
