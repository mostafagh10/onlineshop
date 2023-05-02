const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const thecart = require('./cartmodel')
const theorder = require('./ordermodel')

//const dburl = 'mongodb://localhost:27017/onlineshop3';
const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/Ecommerce?retryWrites=true&w=majority'

const userschema = mongoose.Schema({
    username:String,
    lastname:String,
    email:String,
    password:String,
    isAdmin : Boolean
})

let thenewuser = mongoose.model('user',userschema)

exports.createaccount = (username,lastname,email,password) => {
    //check if the email exist or not
    // yes => error bcz the email is exist
    // no => create new account

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            return thenewuser.findOne({email:email}).then((user) => {
                if(user){
                    mongoose.disconnect();
                    reject('user is exist')
                }
                else{
                    return bcrypt.hash(password,10)
                }
            }).then(hashedpass => {
                let user = new thenewuser({
                    username : username,
                    lastname:lastname,
                    email:email,
                    password:hashedpass,
                    isAdmin : false
                })
                return user.save();
            }).then(() => {
                mongoose.disconnect();
                resolve('user created')
            }).catch(err => {
                mongoose.disconnect();
                reject(err) 
            })
        })
      }
    )
}
/*
exports.loginhomepage = (email,password)=> {
    //check if email exists
    //no ==> error the email is not found
    //yes ==> check the password
    //no ==> error wrong password
    //yes ==> set session

    return new Promise((resolve,reject) => {
        mongoose.connect(dburl).then(()=>
        thenewuser.findOne({email:email})
        ).then(userfound => {
            if(!userfound){
                mongoose.disconnect();
                reject("email is not found");
            }
            else{
                 bcrypt.compare(password,userfound.password).then(same => {
                    if(!same){
                        mongoose.disconnect();
                        reject("passowrd is incorrect");
                    }
                    else{
                        mongoose.disconnect()
                        resolve(userfound._id)
                    }
            })
            }
        }).catch(err => {
            mongoose.disconnect();
            reject("err");
        })
    })
}
*/

exports.loginhomepage = (email,password)=> {
    //check if email exists
    //no ==> error the email is not found
    //yes ==> check the password
    //no ==> error wrong password
    //yes ==> set session

    return new Promise((resolve,reject) => {
        mongoose.connect(dburl).then(()=>
        thenewuser.findOne({email:email})
        ).then(userfound => {
            if(!userfound){
                mongoose.disconnect();
                reject("email is not found");
            }
            else{
                if(userfound.isAdmin === true){
                mongoose.disconnect();
                reject("email is not found");
                }else{
                 bcrypt.compare(password,userfound.password).then(same => {
                    if(!same){
                        mongoose.disconnect();
                        reject("passowrd is incorrect");
                    }
                    else{
                        mongoose.disconnect()
                        resolve({
                            id : userfound._id,
                            isadmin : userfound.isAdmin
                        })
                    }
            })
        }
            }
        }).catch(err => {
            mongoose.disconnect();
            reject("err");
        })
    })
}


exports.getaccountbyid = (id) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thenewuser.findById(id).then((user) => {
                mongoose.disconnect();
                resolve(user)
            }).catch(err => reject(err))
        })
      }
    )
}




exports.getaccountbyid2 = (id) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(dburl).then(() => {
            thenewuser.findById(id).then((user) => {
                thecart.getallitems(id).then(items => {
                    theorder.getallorders(id).then(orders => {
                        mongoose.disconnect();
                        const useritems = {user,items,orders}
                        resolve(useritems)
                    })
                })
            }).catch(err => reject(err))
      }
    )
    
   
  
})
}

/*   after updating      */
exports.createadminaccount = (username,lastname,email,password) => {
    //check if the email exist or not
    // yes => error bcz the email is exist
    // no => create new account

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            return thenewuser.findOne({email:email}).then((user) => {
                if(user){
                    mongoose.disconnect();
                    reject('user is exist')
                }
                else{
                    return bcrypt.hash(password,10)
                }
            }).then(hashedpass => {
                let user = new thenewuser({
                    username : username,
                    lastname:lastname,
                    email:email,
                    password:hashedpass,
                    isAdmin : true
                })
                return user.save();
            }).then(() => {
                mongoose.disconnect();
                resolve('admin created')
            }).catch(err => {
                mongoose.disconnect();
                reject(err) 
            })
        })
      }
    )
}

exports.loginadmin = (email,password)=> {
    //check if email exists
    //no ==> error the email is not found
    //yes ==> check the password
    //no ==> error wrong password
    //yes ==> set session

    return new Promise((resolve,reject) => {
        mongoose.connect(dburl).then(()=>
        thenewuser.findOne({email:email})
        ).then(userfound => {
            if(!userfound){
                mongoose.disconnect();
                reject("email is not found");
            }
            else{
                if(userfound.isAdmin === false){
                mongoose.disconnect();
                reject("email is not found");
                }else{
                 bcrypt.compare(password,userfound.password).then(same => {
                    if(!same){
                        mongoose.disconnect();
                        reject("passowrd is incorrect");
                    }
                    else{
                        mongoose.disconnect()
                        resolve({
                            id : userfound._id,
                            isadmin : userfound.isAdmin
                        })
                    }
            })
        }
            }
        }).catch(err => {
            mongoose.disconnect();
            reject("err");
        })
    })
}

