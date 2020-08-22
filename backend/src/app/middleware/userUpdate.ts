import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import errorHandler from '../../utils/errorHandler'

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, phone_number } = req.body
    req.body = Object.assign({}, {
        first_name,
        last_name,
        email,
        phone_number
    })

    next()
}

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { newPassword } = req.body
    const salt = process.env.SALT_ROUND as string

    try {
        const hash = await bcrypt.hash(newPassword, +salt)
        req.body = Object.assign({}, { hash })

        next()

    } catch (err) {
        errorHandler(req, res, err.message)
    }
}

export const cancelOrderDetail = (req: Request, res: Response, next: NextFunction) => {
    req.body = Object.assign({}, { status_id: 6 })

    next()
}