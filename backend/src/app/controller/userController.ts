import express from 'express'
import bcrypt from 'bcrypt'
import { registerUser, loginUser } from '../validator/userValidator'
import UserModel from '../../database/models/userModel'
import errorHandler from '../../utils/errorHandler'

const router = express.Router()
const User = new UserModel()

router.get('/', async (req: any, res: any) => {

    try {

        // const user = await User.findOne('id', 11)
        console.log(req.session.user)
        res.send("user")

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

            const user = await User.findOne('email', email)
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
                msg: 'Login success.'
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    })

export default router