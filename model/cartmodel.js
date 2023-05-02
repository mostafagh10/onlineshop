const mongoose = require('mongoose');
const theorder = require('./ordermodel')

//const dburl = 'mongodb://localhost:27017/onlineshop3';
const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/Ecommerce?retryWrites=true&w=majority'

const cartschema = mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    productid:String,
    userid:String,
    timestamp:Date,
    img : String
})

let thecart = mongoose.model('cart',cartschema)

exports.getallitems = (id) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecart.find({userid : id}).then((items) => {
                mongoose.disconnect();
                resolve(items)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.getproductbyid = (id) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theproduct.findById(id).then((product) => {
                mongoose.disconnect();
                resolve(product)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.postincart = (name,price,amount,productid,userid,timestamp,img) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
                let cart = new thecart({
                    name : name,
                    price:price,
                    amount:amount,
                    productid:productid,
                    userid:userid,
                    timestamp:timestamp,
                    img : img
                })
                return cart.save();
            }).then(() => {
                mongoose.disconnect();
                resolve('item is added to cart')
            }).catch(err => {
                mongoose.disconnect();
                reject(err) 
            })
        })
}

exports.deleteitem = (id) => {
    /*
   return new Promise((resolve,reject) => {

    mongoose.connect(dburl).then(() => {
            thecart.deleteOne({_id : id}).then(() => {
                theorder.gettheorder(id).then((order) => {
                    if(order){
                        theorder.deleteorderwithcart(id).then(() => {
                            mongoose.disconnect();
                            resolve()
                        })
                    }
                    else{
                        mongoose.disconnect();
                        resolve()
                    }
                })
            })
        }).catch(err => reject(err))
  }
)
*/
return new Promise((resolve,reject) => {

    mongoose.connect(dburl).then(() => {
        thecart.deleteOne({_id : id}).then(() => {
            mongoose.disconnect();
            resolve()
        }).catch(err => reject(err))
    })
  }
)
}

exports.deletetheitems = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
                thecart.deleteMany({amount : {$gt : 0}}).then(() => {
                    mongoose.disconnect();
                    resolve()
                })
            }).catch(err => reject(err))
      }
    )
}

exports.getorderbyid = (id) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecart.findById(id).then((order) => {
                mongoose.disconnect();
                resolve(order)
            }).catch(err => reject(err))
        })
      }
    )
}



