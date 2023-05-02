/* i added usermodel.getaccountbyid2 to get the the number of items in cart in navbar  */
const productmodel = require('../model/productmodel')
const usermodel = require('../model/usermodel')

exports.gethomepage = (req,res,next) => {
    productmodel.getallproducts().then(products => {
    usermodel.getaccountbyid2(req.session.userID).then(useritems => {
            res.render('homepage',{
                products : products,
                useritems : useritems,
                isuser : req.session.userID,
                isadmin : req.session.isAdmin
            })
        })
    })
}