const usermodel = require('../model/usermodel')

exports.getaccount = (req,res,next) => {
    usermodel.getaccountbyid2(req.session.userID).then(useritems => {
        res.render('account',{
            useritems:useritems,
            isuser : req.session.userID,
            isadmin : req.session.isAdmin
            })
        })
}
/*
exports.getaccount2 = (req,res,next) => {
    cartmodel.getallitems(req.session.userID).then(items => {
        res.render('account',{
            items:items
        })
    })
}
*/