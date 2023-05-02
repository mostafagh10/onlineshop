/* i added usermodel.getaccountbyid2 to get the the number of items in cart in navbar  */
const cartmodel = require('../model/cartmodel')
const usermodel = require('../model/usermodel')
const validationres = require('express-validator').validationResult
exports.getcart = (req,res,next) => {
    cartmodel.getallitems(req.session.userID).then(items => {
        usermodel.getaccountbyid2(req.session.userID).then(useritems => {
        res.render('cart',{
            items:items,
            useritems : useritems,
            isuser : req.session.userID,
            isadmin : req.session.isAdmin
        })
    })
    })
}

exports.postcart = (req,res,next) => {
    if(validationres(req).array().length == 0){
    cartmodel.postincart(req.body.name,req.body.price,req.body.amount,req.body.productid,req.session.userID,Date.now(),req.body.image).then(()=> {
        res.redirect('/cart')
    }).catch(err => {
        console.log(err)
        res.redirect('/products')
    })
}
else{
    req.flash('validationerror2',validationres(req).array())
    res.redirect('/products')
}

}

exports.deletecart = (req,res,next) => {
    cartmodel.deleteitem(req.body.itemid).then(() => {
        res.redirect('/cart')
    }).catch(err => {
        console.log(err);
    })
}

exports.deleteallcartitems = (req,res,next) => {
    cartmodel.deletetheitems().then(() => {
        res.redirect('/cart')
    }).catch(err => {
        console.log(err);
    })
}