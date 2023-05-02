const express = require('express')
const path = require('path')
const session = require('express-session');
const sessionstore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const app = express();

const STORE = new sessionstore({
    uri : 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/Ecommerce?retryWrites=true&w=majority',
    collection:'sessions'
})

app.set('view engine','ejs')
app.set('views','view') // view = name of folder view
app.use(flash())
app.use(express.static(path.join(__dirname,'assets'))) //assets is the folder contains css files
app.use(session({
    secret:'this is my secret to hash express sessions',
    saveUninitialized:false,
    store:STORE
}))

const homepagerouter = require('./routes/homepagerouter')
const homerouter = require('./routes/homeroute')
const productroute = require('./routes/productroute')
const authroute = require('./routes/authroute')
const cartroute = require('./routes/cartroute')
const orderdetailsroute = require('./routes/orderdetailsroute')
const orderroute = require('./routes/orderroute')
const addproductroute = require('./routes/addproductroute')
const accountroute = require('./routes/accountroute')
const manageorderroute = require('./routes/manageorderroute')
const editorderroute = require('./routes/editorderroute')
const manageordernewestroute = require('./routes/manageordernewestroute')

app.use('/',homepagerouter)
app.use('/products',homerouter)
app.use('/product',productroute)
app.use('/',authroute)
app.use('/cart',cartroute)
app.use('/cart',orderdetailsroute)
app.use('/order',orderroute)
app.use('/addproduct',addproductroute)
app.use('/account',accountroute)
app.use('/manageorder',manageorderroute)
app.use('/manageorder/newest',manageordernewestroute)
app.use('/editorder',editorderroute)

const PORT = process.env.PORT || 3000
app.listen(PORT , (err) => {
    console.log(err);
    console.log('the project work on port 3000');
})

