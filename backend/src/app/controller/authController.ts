import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import errorHandler from '../../utils/errorHandler'
import UserModel from '../../database/models/userModel'

class Auth {
    async login(req: Request, res: Response) {
        const { email, password } = req.body
        try {
            const User = new UserModel()
            const user = await User.find({
                filterColumn: 'email',
                filterValue: email
            })
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

            req!.session!.user = { id, usergroup_id }
            res.status(200).json({
                success: 1,
                msg: 'Login success.',
                data: { id }
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async changePassword(req: Request, res: Response) {
        const saltRound = process.env.SALT_ROUND as string
        const password = req.body.newPassword
        try {
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
    }

    logout(req: Request, res: Response) { }
}

export default new Auth