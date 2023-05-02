const productmodel = require('../model/productmodel')
const validationres = require('express-validator').validationResult
exports.getaddproduct = (req,res,next) => {
        res.render('addproduct',{
            validationflash4 : req.flash('validationerror4'),
            isuser : req.session.userID,
            isadmin : req.session.isAdmin
        })
}

exports.postaddproduct = (req,res,next) => {
    if(validationres(req).array().length == 0){
    productmodel.postinaddproduct(req.body.name,req.body.price,req.body.description,req.body.category,req.file.filename).then(()=> {
        res.redirect('/products')
    }).catch(err => {
        console.log(err)
        res.redirect('/addproduct')
    })
}
else{
    req.flash('validationerror4',validationres(req).array())
    res.redirect('/addproduct')
}

}