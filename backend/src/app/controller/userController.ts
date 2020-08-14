import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../../database/models/userModel'
import errorHandler from '../../utils/errorHandler'

class User {
    async find(req: Request, res: Response) {
        const {
            filterColumn, filterValue, sortColumn, sortValue, pgColumn, pgOperator, pgLastItem
        } = req.query
        const limit = req.query.limit || 100

        try {
            const User = new UserModel()
            const user = await User.find({
                filterColumn, filterValue, sortColumn, sortValue,
                pgColumn, pgOperator, pgLastItem, limit
            })

            res.status(200).json({
                success: 1,
                data: user
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async profile(req: Request, res: Response) {
        const { id } = req.params
        try {
            const User = new UserModel()
            const user = await User.find({
                filterColumn: 'id',
                filterValue: id
            })

            if (!user.length) {
                throw new Error('User not found.')
            }

            res.status(200).json({
                success: 1,
                data: user[0]
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async create(req: Request, res: Response) {
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
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { update } = req.query
        let data
        let msg

        if (update === "profile") {
            data = req.body
            msg = "Profile updated."
        } else {
            const saltRound = process.env.SALT_ROUND as string
            const password = req.body.newPassword
            const hash = await bcrypt.hash(password, +saltRound)
            data = { hash }
            msg = "Password changed."
        }

        try {
            const User = new UserModel()
            await User.update({ id }, data)

            res.status(200).json({
                success: 1,
                msg
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async delete(req: Request, res: Response) { }
}

export default new User