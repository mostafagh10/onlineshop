const session = require('express-session')
const usermodel = require('../model/usermodel')
const validationres = require('express-validator').validationResult

exports.getsignup = (req,res,next) => {
    res.render('signup',{
        signupflash : req.flash('signuperror')[0],
        validationflash : req.flash('validationerror'),
        isuser : req.session.userID,
        isadmin : req.session.isAdmin
    })
}

exports.postsignup = (req,res,next) => {
    if(validationres(req).array().length === 0){
    usermodel.createaccount(req.body.username,req.body.lastname,req.body.email,req.body.password).then(() => {
        res.redirect('/login')
    }).catch((err) => {
        req.flash('signuperror',err)
        console.log(err)
        res.redirect('/signup')
    })
}
else{
    req.flash('validationerror',validationres(req).array())
    res.redirect('/signup')
}
}

exports.getlogin = (req,res,next) => {
    res.render('login',{
        loginflash : req.flash('loginerror')[0],
        isuser : req.session.userID,
        isadmin : req.session.isAdmin
    })
}

exports.postlogin = (req,res,next) => {
    usermodel.loginhomepage(req.body.email,req.body.password).then((result) => {
        req.session.userID = result.id,
        req.session.isAdmin = result.isadmin
        console.log(result.id);
        res.redirect('/')
    }).catch((err) => {
        req.flash('loginerror',err)
        console.log(err)
        res.redirect('/login')
    })
}

exports.logout = (req,res,next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

/*   after updating       */

exports.getsignupadmin = (req,res,next) => {
    res.render('signupadmin',{
        signupflash : req.flash('signuperror')[0],
        validationflash : req.flash('validationerror'),
        isuser : req.session.userID,
        isadmin : req.session.isAdmin
    })
}

exports.postsignupadmin = (req,res,next) => {
    if(validationres(req).array().length === 0){
    usermodel.createadminaccount(req.body.username,req.body.lastname,req.body.email,req.body.password).then(() => {
        res.redirect('/')
    }).catch((err) => {
        req.flash('signuperror',err)
        console.log(err)
        res.redirect('/signupadmin')
    })
}
else{
    req.flash('validationerror',validationres(req).array())
    res.redirect('/signupadmin')
}
}

exports.getloginadmin = (req,res,next) => {
    res.render('loginadmin',{
        loginflash : req.flash('loginerror')[0],
        isuser : req.session.userID,
        isadmin : req.session.isAdmin
    })
}

exports.postloginadmin = (req,res,next) => {
    usermodel.loginadmin(req.body.email,req.body.password).then((result) => {
        req.session.userID = result.id,
        req.session.isAdmin = result.isadmin
        console.log(result.id);
        res.redirect('/')
    }).catch((err) => {
        req.flash('loginerror',err)
        console.log(err)
        res.redirect('/loginadmin')
    })
}