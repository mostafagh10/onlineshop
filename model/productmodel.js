const mongoose = require('mongoose');

//const dburl = 'mongodb://localhost:27017/onlineshop3';
const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/Ecommerce?retryWrites=true&w=majority'


const productschema = mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    category:String,
    img : String
})

let theproduct = mongoose.model('product',productschema)

exports.getallproducts = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theproduct.find({}).then((products) => {
                mongoose.disconnect();
                resolve(products)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.getproductsbycategory = (category) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theproduct.find({category:category}).then((products) => {
                mongoose.disconnect();
                resolve(products)
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

exports.postinaddproduct = (name,price,description,category,img) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            let product = new theproduct ({
                name:name,
                price:price,
                description:description,
                category:category,
                img:img
            })
            return product.save();
        }).then(() => {
                mongoose.disconnect();
                resolve()
            })
            .catch(err => reject(err))
        })
}

exports.deletetheproduct = (id) => {
    return new Promise((resolve,reject) => {
    
        mongoose.connect(dburl).then(() => {
            theproduct.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}
