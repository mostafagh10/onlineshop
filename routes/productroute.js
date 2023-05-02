const router = require('express').Router();
const productcontroller = require('../controller/productcontroller')
router.get('/:id',productcontroller.getproduct)

module.exports = router