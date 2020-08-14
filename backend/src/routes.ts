import Route from './bootstrap/router'
import User from './app/controller/userController'
import Auth from './app/controller/authController'
import Address from './app/controller/addressController'
import Order from './app/controller/orderController'
import Product from  './app/controller/productController'
import ProductVariation from './app/controller/productVariationController'

import { isLogin, selfAccess } from './app/middleware/auth'
import imageUploader from './app/middleware/imageUploader'

import { vAddAddress } from './app/validator/addressValidator'
import { vCreateOrder } from './app/validator/orderValidator'
import { vAddProduct, vAddProductVariation } from './app/validator/productValidator'
import { vUserRegister, vUserLogin, vUserChangePassword, vUserUpdateProfile } 
    from './app/validator/userValidator'

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
        path: '/:id',
        handler: User.profile,
        middleware: [isLogin, selfAccess]
    },
    {
        method: 'POST',
        path: '/',
        handler: User.create,
        middleware: [vUserRegister]
    },
    {
        method: 'PUT',
        path: '/:id',
        handler: User.update,
        middleware: [isLogin, selfAccess, vUserUpdateProfile]
    }
])

Route.register('/auth', [
    {
        method: 'POST',
        path: '/login',
        handler: Auth.login,
        middleware: [vUserLogin]
    },
    {
        method: 'PUT',
        path: '/change-password/:id',
        handler: Auth.changePassword,
        middleware: [isLogin, selfAccess, vUserChangePassword]
    }
])

Route.register('/address', [
    {
        method: 'GET',
        path: '/',
        handler: Address.list,
        middleware: [isLogin, selfAccess]
    },
    {
        method: 'POST',
        path: '/',
        handler: Address.create,
        middleware: [isLogin, vAddAddress]
    }
])

Route.register('/order', [
    {
        method: 'GET',
        path: '/',
        handler: Order.list,
        middleware: [isLogin, selfAccess]
    },
    {
        method: 'POST',
        path: '/',
        handler: Order.create,
        middleware: [isLogin, vCreateOrder]
    }
])

Route.register('/product', [
    {
        method: 'GET',
        path: '/',
        handler: Product.list
    },
    {
        method: 'GET',
        path: '/:id',
        handler: Product.detail
    }
])

/**
 * Routes for administration task
 */

Route.register('/ad/user', [
    {
        method: 'GET',
        path: '/',
        handler: User.find
        // need to add middleware
    }
])

Route.register('/ad/product', [
    {
        method: 'POST',
        path: '/',
        handler: Product.create,
        middleware: [imageUploader, vAddProduct]
    }
])

Route.register('/ad/product-variation', [
    {
        method: 'GET',
        path: '/',
        handler: ProductVariation.list
    },
    {
        method: 'GET',
        path: '/:id',
        handler: ProductVariation.show
    },
    {
        method: 'POST',
        path: '/',
        handler: ProductVariation.create,
        middleware: [vAddProductVariation]
    },
    {
        method: 'PUT',
        path: '/:id',
        handler: ProductVariation.update
    }
])

export default Route