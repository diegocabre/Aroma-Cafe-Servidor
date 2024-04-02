const {validateCredentials,validationFieldLogin}=require('./checkLogin/index');
const {validationCorreo, validationFieldRegistrer,verifytoken}=require('./checkRegister/index');
const {checkProductos,checkProductoById} = require('./checkProductos/index');
const {checkCarritoField,checkCarrito,checkSesion,checkDeleteCarrito} = require('./checkCarrito/index')

module.exports = {
    checkProductos,
    checkProductoById, 
    validationFieldLogin,
    validationCorreo,
    validateCredentials,
    validationFieldRegistrer,
    checkCarritoField,
    checkCarrito,
    checkSesion,
    checkDeleteCarrito,
    verifytoken
    }