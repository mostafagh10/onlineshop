const router = require('express').Router();
const bodyparser = require('body-parser')
const manageordercontroller = require('../controller/manageordercontroller')
const editordercontroller = require('../controller/editordercontroller')
router.get('/',manageordercontroller.getordersnewest)
router.post('/',bodyparser.urlencoded({extended:true}),manageordercontroller.saveordernewest)
module.exports = router