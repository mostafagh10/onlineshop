const router = require('express').Router();
const homepagecontroller = require('../controller/homepagecontroller')

router.get('/',homepagecontroller.gethomepage)

module.exports = router