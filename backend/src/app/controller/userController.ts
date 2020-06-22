import express from 'express'
import bcrypt from 'bcrypt'
import { registerUser } from '../validator/userValidator'
import UserModel from '../../database/models/userModel'
import errorHandler from '../../utils/errorHandler'

const router = express.Router()
const User = new UserModel()

router.get('/', async (req: any, res: any) => {
    try {

        const user = await User.findOne('id', 11)

        res.json(user)

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

export default router