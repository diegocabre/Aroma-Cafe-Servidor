const router = require('express').Router();
const {validationCorreo,validationFieldRegistrer} = require('../../middleware/index');
const {userRegistrer}=require('../../controllers/index');

router.post('/',validationFieldRegistrer,validationCorreo,userRegistrer);


module.exports = router