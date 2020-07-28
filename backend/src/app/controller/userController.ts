import express from 'express'
import bcrypt from 'bcrypt'
import { registerUser, loginUser, changePassword } from '../validator/userValidator'
import {isLogin, accessControl} from '../middleware/auth'
import UserModel from '../../database/models/userModel'
import errorHandler from '../../utils/errorHandler'

const router = express.Router()

router.get('/', isLogin, async (req: any, res: any) => {

    try {
        // const user = await User.findBy('id', 11)
        // console.log(req.session.user)
        res.send({
            success: 1,
            data: 'can access'
        })

    } catch (err) {
        errorHandler(req, res, err.message)
    }
})

router.post(
    '/register',
    [registerUser],
    async (req: any, res: any) => {

        const {
            first_name,
            last_name,
            phone_number,
            email,
            password,
            usergroup_id
        } = req.body
        const saltRound = process.env.SALT_ROUND as string

        try {

            const hash = await bcrypt.hash(password, +saltRound)
            const User = new UserModel()
            await User.save({
                first_name,
                last_name,
                phone_number,
                email,
                hash,
                usergroup_id
            })

            res.status(201).json({
                success: 1,
                msg: 'User registered.'
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }

    })

router.post(
    '/login',
    [loginUser],
    async (req: any, res: any) => {

        const { email, password } = req.body

        try {

            const User = new UserModel()
            const user = await User.findBy('email', email)
            if (!user.length) {
                return res.status(404).json({
                    success: 0,
                    msg: 'Email not found.'
                })
            }

            const { id, hash, usergroup_id } = user[0]
            const isMatch = await bcrypt.compare(password, hash)
            if (!isMatch) {
                return res.status(400).json({
                    success: 0,
                    msg: 'Wrong password.'
                })
            }

            req.session.user = { id, usergroup_id }
            res.status(200).json({
                success: 1,
                msg: 'Login success.',
                data: { id }
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    })

router.get(
    '/:id',
    [isLogin, accessControl],
    async (req: any, res: any) => {

    try {
        
        const { id } = req.params
        const User = new UserModel()
        const user = await User.findBy('id', id)

        if (!user.length) {
            throw new Error('User not found.')
        }

        res.status(200).json({
            success: 1,
            data: {

            }
        })

    } catch (err) {
        errorHandler(req, res, err.message)
    }
})

router.put('/update-profile/:id', async (req: any, res: any) => {})

router.put(
    '/change-password/:id',
    [isLogin, accessControl, changePassword],
    async (req: any, res: any) => {
        
        try {
            
            const saltRound = process.env.SALT_ROUND as string
            const password = req.body.newPassword
            const hash = await bcrypt.hash(password, +saltRound)
            const User = new UserModel()
            await User.update(
                { id: req.params.id },
                { hash }
            )

            res.status(200).json({
                success: 1,
                msg: 'Password changed.'
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    })

export default router