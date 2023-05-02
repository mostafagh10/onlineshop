const router = require('express').Router();
const authcontroller = require('../controller/authcontroller')
const bodyparser = require('body-parser')
const checkthevalidator = require('express-validator').check
const authguard = require('../middleware/notauth')
const authguard2 = require('../middleware/authadmin')

router.get('/signup',authguard.notauth,authcontroller.getsignup)

router.post('/signup',
bodyparser.urlencoded({extended:true}),
checkthevalidator('username').not().isEmpty().withMessage('username is required'),
checkthevalidator('lastname').not().isEmpty().withMessage('lastname is required'),
checkthevalidator('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('wrong format'),
checkthevalidator('password').not().isEmpty().withMessage('password is required').isLength({min : 6}).withMessage('password length is invalid'),
checkthevalidator('confirmpassword').custom((value,{req}) => {
    if (value === req.body.password){
        return true
    }
    else{
        throw 'password dont equal to confirm'
    }
}),
authcontroller.postsignup)

router.get('/login',authguard.notauth,authcontroller.getlogin);

router.post('/login',bodyparser.urlencoded({extended:true}),authcontroller.postlogin)

router.all('/logout',authcontroller.logout)

/*    after updating        */

router.get('/signupadmin',authguard2.isauthadmin,authcontroller.getsignupadmin)

router.post('/signupadmin',
bodyparser.urlencoded({extended:true}),
checkthevalidator('username').not().isEmpty().withMessage('username is required'),
checkthevalidator('lastname').not().isEmpty().withMessage('lastname is required'),
checkthevalidator('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('wrong format'),
checkthevalidator('password').not().isEmpty().withMessage('password is required').isLength({min : 6}).withMessage('password length is invalid'),
checkthevalidator('confirmpassword').custom((value,{req}) => {
    if (value === req.body.password){
        return true
    }
    else{
        throw 'password dont equal to confirm'
    }
}),
authcontroller.postsignupadmin)

router.get('/loginadmin',authguard.notauth,authcontroller.getloginadmin);

router.post('/loginadmin',bodyparser.urlencoded({extended:true}),authcontroller.postloginadmin)

module.exports = router