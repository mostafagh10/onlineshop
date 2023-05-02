const router = require('express').Router();
const accountcontroller = require('../controller/accountcontroller')
const bodyparser = require('body-parser')
const checkthevalidator = require('express-validator').check
const authguard = require('../middleware/authuser')

router.get('/',authguard.isauthuser,accountcontroller.getaccount)
//router.get('/',accountcontroller.getaccount2)

module.exports = router;