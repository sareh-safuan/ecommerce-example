import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import errorHandler from '../../utils/errorHandler'

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, phone_number, email } = req.body

    req.body.data =  { first_name, last_name, phone_number, email }

    next()
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { newPassword } = req.body
    const salt = process.env.SALT_ROUND as string

    try {
        const hash = await bcrypt.hash(newPassword, +salt)
        req.body.data = { hash }

        next()

    } catch (err) {
        errorHandler(req, res, err.message)
    }
} 