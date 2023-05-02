const mongoose = require('mongoose');
const theproduct = require('./productmodel')
const thecart = require('./cartmodel')

//const dburl = 'mongodb://localhost:27017/onlineshop3';
const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/Ecommerce?retryWrites=true&w=majority'

const orderschema = mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    productid:String,
    userid:String,
    timestamp:Date,
    address:String,
    status:String,
    cartid : String,
    img : String
})

let theorder = mongoose.model('order',orderschema)

exports.getallorders = (id) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theorder.find({userid : id}).then((items) => {
                mongoose.disconnect();
                resolve(items)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.getallordersindb = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theorder.find({}, {} , {sort : {timestamp : 1}}).then((orders) => {
                    mongoose.disconnect();
                    resolve(orders)
                })
            }).catch(err => reject(err))
        })
      }

exports.getallordersindbnewest = () => {

    return new Promise((resolve,reject) => {
    
        mongoose.connect(dburl).then(() => {
            theorder.find({}, {} , {sort : {timestamp : -1}}).then((orders) => {
                mongoose.disconnect();
                resolve(orders)
            })
        }).catch(err => reject(err))
    })
}

exports.gettheorder = (id) => {
    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theorder.findOne({cartid : id}).then((order) => {
                mongoose.disconnect();
                resolve(order)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.postinorder = (name,price,amount,productid,userid,timestamp,address,cartid,img) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
                let order = new theorder({
                    name : name,
                    price:price,
                    amount:amount,
                    productid:productid,
                    userid:userid,
                    timestamp:timestamp,
                    address:address,
                    status:'pending',
                    cartid:cartid,
                    img:img
                })
                return order.save();
            }).then(() => {
                thecart.deleteitem({_id : cartid}).then(() => {
                    mongoose.disconnect();
                    resolve('item is added to order')
                })
            }).catch(err => {
                mongoose.disconnect();
                reject(err) 
            })
        })
}

exports.deletetheorder = (id) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theorder.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}

exports.deleteorderwithcart = (id) => {
    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theorder.deleteOne({cartid : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}

/*
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
*/

exports.getrequiredorderbyid = (id) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theorder.findById(id).then((order) => {
                mongoose.disconnect();
                resolve(order)
            }).catch(err => reject(err))
        })
      }
    )
}


exports.editorder = (id,newdata) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theorder.updateOne({_id : id},newdata).then(() => {
                mongoose.disconnect();
                resolve('item is updated')
            }).catch(err => reject(err))
        })
      }
    )
}

exports.getordersbystatus = (status) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theorder.find({status:status} , {} , {sort:{timestamp : 1}}).then((orders) => {
                mongoose.disconnect();
                resolve(orders)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.getordersbystatusnewest = (status) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theorder.find({status:status} , {} , {sort:{timestamp : -1}}).then((orders) => {
                mongoose.disconnect();
                resolve(orders)
            }).catch(err => reject(err))
        })
      }
    )
}


