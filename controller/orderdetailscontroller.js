/* i added usermodel.getaccountbyid2 to get the the number of items in cart in navbar  */

const orderdetailsmodel = require('../model/cartmodel')
const usermodel = require('../model/usermodel')

exports.getorderdetails = (req,res,next) => {
    let id = req.params.id;
    orderdetailsmodel.getorderbyid(id).then(order => {
        usermodel.getaccountbyid2(req.session.userID).then(useritems => {
        res.render('orderdetails',{
            order:order,
            useritems : useritems,
            validationerror3 : req.flash('validationerror3')[0],
            isuser : req.session.userID,
            isadmin : req.session.isAdmin
        })
    })
    })
}