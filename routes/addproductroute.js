const router = require('express').Router();
const addproductcontroller = require('../controller/addproductcontroller')
const bodyparser = require('body-parser')
const checkthevalidator = require('express-validator').check
const multer = require('multer');
const authguard = require('../middleware/authadmin')

const storage = multer.diskStorage({
    destination:function (request , file , callback){
        callback(null , './assets/upload/images')
    },

    filename:function (request , file , callback){
        callback(null, Date.now()+file.originalname)
    }
})

const upload = multer({
    storage : storage,
    limits : {
        fieldSize : 1024 * 1024 * 3,
    },
})


router.get('/',authguard.isauthadmin,addproductcontroller.getaddproduct)

router.post('/',bodyparser.urlencoded({extended:true}),upload.single('image'),
checkthevalidator('name').not().isEmpty().withMessage('name of product is required'),
checkthevalidator('price').not().isEmpty().withMessage('price of product is required'),
checkthevalidator('description').not().isEmpty().withMessage('description of product is required'),
checkthevalidator('category').not().isEmpty().withMessage('category of product is required')
/*
(checkthevalidator('name').not().isEmpty() || checkthevalidator('price').not().isEmpty() || checkthevalidator('description').not().isEmpty() || checkthevalidator('category').not().isEmpty()).withMessage('please fill all fields')
*/
, addproductcontroller.postaddproduct)

module.exports = router;