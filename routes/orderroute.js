const router = require('express').Router();
const ordercontroller = require('../controller/ordercontroller')
const bodyparser = require('body-parser')
const checkthevalidator = require('express-validator').check
const authguard = require('../middleware/authuser')
router.get('/',authguard.isauthuser,ordercontroller.getorder)

router.post('/',bodyparser.urlencoded({extended:true}),
checkthevalidator('address').not().isEmpty().withMessage('address is required')
, ordercontroller.postorder)

router.post('/delete',bodyparser.urlencoded({extended:true}),
ordercontroller.deleteorder)


module.exports = router