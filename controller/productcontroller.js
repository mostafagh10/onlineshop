/* i added usermodel.getaccountbyid2 to get the the number of items in cart in navbar  */

const productmodel = require('../model/productmodel')
const usermodel = require('../model/usermodel')

exports.getproduct = (req,res,next) => {
    let id = req.params.id;
    productmodel.getproductbyid(id).then(product => {
        usermodel.getaccountbyid2(req.session.userID).then(useritems => {
        res.render('product',{
            product:product,
            useritems:useritems,
            isuser : req.session.userID,
            isadmin : req.session.isAdmin
        })
    })
    })
}