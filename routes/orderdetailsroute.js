const router = require('express').Router();
const orderdetailscontroller = require('../controller/orderdetailscontroller')
router.get('/:id',orderdetailscontroller.getorderdetails)

module.exports = router