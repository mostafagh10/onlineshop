const ordermodel = require('../model/ordermodel')

exports.gettherequiredorder = (req,res,next) => {
    let id = req.params.id;
    ordermodel.getrequiredorderbyid(id).then(order => {
        res.render('editorder',{
            order:order,
            isuser : req.session.userID,
            isadmin : req.session.isAdmin
        })
    })
}

exports.gettherequiredorder2 = (req,res,next) => {
    let id = req.params.id;
    ordermodel.getrequiredorderbyid(id).then(order => {
        res.render('editorder2',{
            order:order,
            isuser : req.session.userID,
            isadmin : req.session.isAdmin
        })
    })
}

exports.saveorder = (req,res,next) => {
    ordermodel.editorder(req.body.orderid,{status : req.body.status}).then(() => {
        res.redirect('/manageorder')
    }).catch(err => {
        console.log(err)
        res.redirect('/');
    })
}