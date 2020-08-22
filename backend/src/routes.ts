import Route from './bootstrap/router'
import User from './app/controller/userController'
import Auth from './app/controller/authController'
import Address from './app/controller/addressController'
import Order from './app/controller/orderController'
import OrderDetail from './app/controller/orderDetailController'
import Product from  './app/controller/productController'
import ProductVariant from './app/controller/productVariantController'

// import { isLogin, selfAccess } from './app/middleware/auth'
import imageUploader from './app/middleware/imageUploader'
import { updateProfile, changePassword } from './app/middleware/transformUserUpdateData'

import { vAddAddress } from './app/validator/addressValidator'
import { vCreateOrder } from './app/validator/orderValidator'
import { vAddProduct, vAddProductVariant } from './app/validator/productValidator'
import { vUserRegister, vUserLogin, vUserChangePassword, vUserUpdateProfile } 
    from './app/validator/userValidator'

Route.register('/auth', [
    {
        method: 'POST',
        path: '/login',
        handler: Auth.login,
        middleware: [vUserLogin]
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
        method: 'POST',
        path: '/',
        handler: User.create,
        middleware: [vUserRegister]
    },
    {
        method: 'GET',
        path: '/:user',
        handler: User.show
    },
    {
        method: 'PUT',
        path: '/:user/profile',
        handler: User.update,
        middleware: [vUserUpdateProfile, updateProfile]
    },
    {
        method: 'PUT',
        path: '/:user/password',
        handler: User.update,
        middleware: [vUserChangePassword, changePassword]
    },
    {
        method: 'GET',
        path: '/:user/address',
        handler: Address.index
    },
    {
        method: 'POST',
        path: '/:user/address',
        handler: Address.create,
        middleware: [vAddAddress]
    },
    {
        method: 'GET',
        path: '/:user/order',
        handler: Order.index
    },
    {
        method: 'POST',
        path: '/:user/order',
        handler: Order.create,
        middleware: [vCreateOrder]
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
        method: 'POST',
        path: '/',
        handler: Product.create,
        middleware: [imageUploader, vAddProduct]
    },
    {
        method: 'GET',
        path: '/:product',
        handler: Product.show
    },
    {
        method: 'POST',
        path: '/:product',
        handler: ProductVariant.create,
        middleware: [vAddProductVariant]
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
    },
    {
        method: 'GET',
        path: '/:address',
        handler: Address.show
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