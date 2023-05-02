/* i added usermodel.getaccountbyid2 to get the the number of items in cart in navbar  */

const ordermodel = require('../model/ordermodel')
const usermodel = require('../model/usermodel')
const validationres = require('express-validator').validationResult

exports.getorder = (req,res,next) => {
    ordermodel.getallorders(req.session.userID).then(items => {
        usermodel.getaccountbyid2(req.session.userID).then(useritems => {
        res.render('order',{
            items:items,
            useritems:useritems,
            isuser : req.session.userID,
            isadmin : req.session.isAdmin
        })
    })
    })
}

exports.postorder = (req,res,next) => {
    if(validationres(req).array().length == 0){
    ordermodel.postinorder(req.body.name,req.body.price,req.body.amount,req.body.productid,req.session.userID,Date.now(),req.body.address,req.body.cartid,req.body.image).then(()=> {
        res.redirect('/order')
    }).catch(err => {
        console.log(err)
        res.redirect(req.body.url)
    })
}
else{
    req.flash('validationerror3',validationres(req).array())
    res.redirect(req.body.url)
}

}

exports.deleteorder = (req,res,next) => {
    ordermodel.deletetheorder(req.body.itemid).then(() => {
        res.redirect('/order')
    }).catch(err => {
        console.log(err);
    })
}