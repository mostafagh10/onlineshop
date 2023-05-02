exports.isauthadmin = (req,res,next) => {
    if(req.session.userID && req.session.isAdmin){
        next();
    }else{
        res.redirect('/loginadmin')
    }
}