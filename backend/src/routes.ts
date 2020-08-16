import Route from './bootstrap/router'
import User from './app/controller/userController'
import AddressModel from './database/models/addressModel'
// import Auth from './app/controller/authController'
import Address from './app/controller/addressController'
import Order from './app/controller/orderController'
import Product from  './app/controller/productController'
// import ProductVariation from './app/controller/productVariationController'

// import { isLogin, selfAccess } from './app/middleware/auth'
// import imageUploader from './app/middleware/imageUploader'

// import { vAddAddress } from './app/validator/addressValidator'
// import { vCreateOrder } from './app/validator/orderValidator'
// import { vAddProduct, vAddProductVariation } from './app/validator/productValidator'
// import { vUserRegister, vUserLogin, vUserChangePassword, vUserUpdateProfile } 
//     from './app/validator/userValidator'

Route.register({
    method: 'GET',
    path: '/',
    handler: (req: any, res: any) => {
        res.send('Hello from typescript route.')
    }
})

Route.register('/user', [
    {
        method: 'GET',
        path: '/',
        handler: User.index
    },
    {
        method: 'GET',
        path: '/:user',
        handler: User.show
    },
    {
        method: 'GET',
        path: '/:user/address',
        handler: Address.index
    },
    {
        method: 'GET',
        path: '/:user/order',
        handler: Order.index
    }
])

Route.register('/product', [
    {
        method: 'GET',
        path: '/:product',
        handler: Product.show
    }
])

Route.register('/order', [
    {
        method: 'GET',
        path: '/',
        handler: Order.index
    },
    {
        method: 'GET',
        path: '/:order',
        handler: Order.show
    }
])

export default Route