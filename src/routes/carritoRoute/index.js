const router  = require('express').Router();
const {addProducto,getDataIntoCar,actDataIntoCar,deleteintoCar}= require('../../controllers/index');
const {checkCarritoField,checkCarrito,checkSesion,checkDeleteCarrito} = require('../../middleware/index');

router.get('/',checkSesion,getDataIntoCar)
router.post('/',checkCarritoField,checkCarrito,addProducto);
router.put('/',checkCarritoField,checkCarrito,checkSesion,actDataIntoCar);
router.delete('/',checkSesion,checkDeleteCarrito,deleteintoCar)


module.exports = router;