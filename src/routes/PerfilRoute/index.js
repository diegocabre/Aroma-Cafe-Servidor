const router = require('express').Router();
const {verifytoken} = require('../../middleware/index');
const {userAccess} =require('../../controllers/index');

router.get('/',verifytoken,userAccess);

module.exports = router