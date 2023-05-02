const router = require('express').Router();
const bodyparser = require('body-parser')
const manageordercontroller = require('../controller/manageordercontroller')
const editordercontroller = require('../controller/editordercontroller')
const authguard = require('../middleware/authadmin')
router.get('/oldest',authguard.isauthadmin,manageordercontroller.getorders)
router.post('/oldest',bodyparser.urlencoded({extended:true}),manageordercontroller.saveorderoldest)
module.exports = router