import Route from './bootstrap/router'
import User from './app/controller/userController'
import Auth from './app/controller/authController'
import Address from './app/controller/addressController'
import Order from './app/controller/orderController'
import OrderDetail from './app/controller/orderDetailController'
import Product from  './app/controller/productController'
import ProductVariant from './app/controller/productVariantController'

import imageUploader from './app/middleware/imageUploader'
import { updatePassword, cancelOrderDetail, updateProfile }
    from './app/middleware/userUpdate'
import { updateProductInfo } from './app/middleware/productUpdate'

import { vAddAddress, vUpdateAddress } from './app/validator/addressValidator'
import { vCreateOrder, vUpdateOrderStatus } from './app/validator/orderValidator'
import { vAddProduct, vAddProductVariant, vUpdateProductInfo, vUpdateProductImage }
    from './app/validator/productValidator'
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
        middleware: [vUserChangePassword, updatePassword]
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
        method: 'PUT',
        path: '/:user/address/:address',
        handler: Address.update,
        middleware: [vUpdateAddress]
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
        handler: Order.show
    },
    {
        method: 'PUT',
        path: '/:user/order/:order_detail/cancel',
        handler: OrderDetail.update,
        middleware: [cancelOrderDetail]
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
    },
    {
        method: 'PUT',
        path: '/:product/image',
        handler: Product.update,
        middleware: [imageUploader, vUpdateProductImage]
    },
    {
        method: 'PUT',
        path: '/:product/info',
        handler: Product.update,
        middleware: [vUpdateProductInfo, updateProductInfo]
    },
    {
        method: 'PUT',
        path: '/:product/variant/:variant',
        handler: ProductVariant.update,
        middleware: []
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
    },
    {
        method: 'PUT',
        path: '/:order',
        handler: Order.update,
        middleware: [vUpdateOrderStatus]
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