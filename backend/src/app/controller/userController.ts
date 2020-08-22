import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../../database/models/userModel'
import errorHandler from '../../utils/errorHandler'

class User {
    async index(req: Request, res: Response) {
        try {
            const User = new UserModel()
            const users = await User.query().select()

            res.json({ data: users })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async show(req: Request, res: Response) {
        const { user: id } = req.params
        
        try {
            const User = new UserModel()
            const user = await User.query().select().where('id', id)

            res.json({ data: user })
            
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
        const id = req.params.user
        const { data } = req.body

        try {
            const User = new UserModel()
            await User.update({ id }, data)

            res.status(200).json({
                success: 1,
                msg: 'User updated.'
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async delete(req: Request, res: Response) { }
}

export default new User