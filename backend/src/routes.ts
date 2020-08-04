import Route from './bootstrap/router'
import User from './app/controller/userController'
import Auth from './app/controller/authController'

import { vUserRegister, vUserLogin, vUserChangePassword, vUserUpdateProfile } 
    from './app/validator/userValidator'
import { isLogin, selfAccess } from './app/middleware/auth'

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

export default Route