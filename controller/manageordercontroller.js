const ordermodel = require('../model/ordermodel')
const validationres = require('express-validator').validationResult
exports.getorders = (req,res,next) => {
    let getstatus = req.query.filterstatus;
    let validcategories = ['all','pending','sent','completed'];
    if(getstatus!== 'all' && validcategories.includes(getstatus)){
        ordermodel.getordersbystatus(getstatus).then(orders => {
            res.render('manageorder',{
                orders:orders,
                isuser : req.session.userID,
                isadmin : req.session.isAdmin
            })
        })
    }
    else{
    ordermodel.getallordersindb().then(orders => {
        res.render('manageorder',{
            orders:orders,
            isuser : req.session.userID,
            isadmin : req.session.isAdmin
        })
    })
}
}


exports.getordersnewest = (req,res,next) => {
    let getstatus = req.query.filterstatus;
    let validcategories = ['all','pending','sent','completed'];
    if(getstatus!== 'all' && validcategories.includes(getstatus)){
        ordermodel.getordersbystatusnewest(getstatus).then(orders => {
            res.render('manageordernewest',{
                orders:orders,
                isuser : req.session.userID,
                isadmin : req.session.isAdmin
            })
        })
    }
    else{
    ordermodel.getallordersindbnewest().then(orders => {
        res.render('manageordernewest',{
            orders:orders,
            isuser : req.session.userID,
            isadmin : req.session.isAdmin
        })
    })
}
}

exports.saveorderoldest = (req,res,next) => {
    ordermodel.editorder(req.body.orderid,{status : req.body.status,timestamp : Date.now()}).then(() => {
        res.redirect('/manageorder/oldest')
    }).catch(err => {
        console.log(err)
        res.redirect('/addproduct');
    })
}

exports.saveordernewest = (req,res,next) => {
    ordermodel.editorder(req.body.orderid,{status : req.body.status,timestamp : Date.now()}).then(() => {
        res.redirect('/manageorder/newest')
    }).catch(err => {
        console.log(err)
        res.redirect('/addproduct');
    })
}