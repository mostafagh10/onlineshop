const router = require('express').Router();
const homecontroller = require('../controller/homecontroller')
const bodyparser = require('body-parser')
router.get('/',homecontroller.gethome)

router.post('/delete',bodyparser.urlencoded({extended:true}),
homecontroller.deleteproduct)

module.exports = router