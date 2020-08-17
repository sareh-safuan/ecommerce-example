import Route from './bootstrap/router'
import User from './app/controller/userController'
import Auth from './app/controller/authController'
import Address from './app/controller/addressController'
import Order from './app/controller/orderController'
import OrderDetail from './app/controller/orderDetailController'
import Product from  './app/controller/productController'
// import ProductVariation from './app/controller/productVariationController'

// import { isLogin, selfAccess } from './app/middleware/auth'
// import imageUploader from './app/middleware/imageUploader'

// import { vAddAddress } from './app/validator/addressValidator'
// import { vCreateOrder } from './app/validator/orderValidator'
// import { vAddProduct, vAddProductVariation } from './app/validator/productValidator'
// import { vUserRegister, vUserLogin, vUserChangePassword, vUserUpdateProfile } 
//     from './app/validator/userValidator'

Route.register('/auth', [
    {
        method: 'POST',
        path: '/login',
        handler: Auth.login
    },
    {
        method: 'GET',
        path: 'logout',
        handler: Auth.logout
    }
])

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
    },
    {
        method: 'GET',
        path: '/:user/order/:order',
        handler: OrderDetail.index
    }
])

Route.register('/product', [
    {
        method: 'GET',
        path: '/',
        handler: Product.index
    },
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
        handler: OrderDetail.index
    }
])

Route.register('/address', [
    {
        method: 'GET',
        path: '/',
        handler: Address.index
    }
])

Route.register({
    method: '*',
    path: '*',
    handler: (req: any, res: any) => {
        res.send('Not Found.')
    }
})

export default Route