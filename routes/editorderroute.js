const router = require('express').Router();
const editordercontroller = require('../controller/editordercontroller')
const authguard = require('../middleware/authadmin')
router.get('/oldest/:id',authguard.isauthadmin,editordercontroller.gettherequiredorder)
router.get('/newest/:id',authguard.isauthadmin,editordercontroller.gettherequiredorder2)
router.post('/save',editordercontroller.saveorder)

module.exports = router