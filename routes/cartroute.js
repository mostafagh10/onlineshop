const router = require('express').Router();
const cartcontroller = require('../controller/cartcontroller')
const bodyparser = require('body-parser')
const checkthevalidator = require('express-validator').check
const authguard = require('../middleware/authuser')
router.get('/',authguard.isauthuser,cartcontroller.getcart)

router.post('/',bodyparser.urlencoded({extended:true}),
checkthevalidator('amount').not().isEmpty().withMessage('amount is required').isInt({min : 1}).withMessage('amount must be greater than 0')
, cartcontroller.postcart)

router.post('/delete',bodyparser.urlencoded({extended:true}),
cartcontroller.deletecart)

router.post('/deleteall',bodyparser.urlencoded({extended:true}),
cartcontroller.deleteallcartitems)


module.exports = router