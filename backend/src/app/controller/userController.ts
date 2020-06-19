import express from 'express'
import { registerUser } from '../validator/userValidator'

const router = express.Router()

router.post(
    '/register',
    [registerUser],
    (req: any, res: any) => {

    const {
        first_name,
        last_name,
        email,
        phone_number,
        password,
        usergroup_id
    } = req.body

    res.status(201).json({
        success: 1,
        data: {
            msg: 'User registered'
        }
    })

})

export default router