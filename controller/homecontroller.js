/* i added usermodel.getaccountbyid2 to get the the number of items in cart in navbar  */
const productmodel = require('../model/productmodel')
const usermodel = require('../model/usermodel')

exports.gethome = (req,res,next) => {
    //get products from db
    // show products in home.ejs

    //if categoryname == all => getall products
    //else getproductsbycategory
    let cat = req.query.categoryname;
    let validcategories = ['all','mobiles','clothes','electronics','furnitures','watches','shoes','perfumes','other'];
    if(cat!== 'all' && validcategories.includes(cat)){
        productmodel.getproductsbycategory(cat).then(products => {
            usermodel.getaccountbyid2(req.session.userID).then(useritems => {
            res.render('home',{
                products:products,
                useritems:useritems,
                validationflash2 : req.flash('validationerror2')[0],
                isuser : req.session.userID,
                isadmin : req.session.isAdmin
            })
        })
        })
    }
    else{
        productmodel.getallproducts().then(products => {
            usermodel.getaccountbyid2(req.session.userID).then(useritems => {
            res.render('home',{
                products:products,
                useritems : useritems,
                validationflash2 : req.flash('validationerror2')[0],
                isuser : req.session.userID,
                isadmin : req.session.isAdmin
            })
        })
        }) 
    }
}

exports.deleteproduct = (req,res,next) => {
    productmodel.deletetheproduct(req.body.productid).then(() => {
        res.redirect('/products')
    }).catch(err => {
        console.log(err);
    })
}