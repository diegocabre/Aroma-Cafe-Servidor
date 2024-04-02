const routes = require('express').Router();
const productoRouter = require('./productoRoute/index');
const loginRoute = require('./LoginRoute/index');
const RegisterRoute = require('./RegisterRoute/index');
const CarritoRoute = require('./carritoRoute/index');
const PerfilRoute = require('./PerfilRoute/index');

routes.use('/productos',productoRouter);
routes.use('/login', loginRoute);
routes.use('/registro',RegisterRoute);
routes.use('/carrito',CarritoRoute);
routes.use('/perfil',PerfilRoute)

module.exports =routes;
