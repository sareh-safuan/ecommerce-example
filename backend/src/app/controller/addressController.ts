import { Request, Response } from 'express'
import AddressModel from '../../database/models/addressModel'
import errorHandler from '../../utils/errorHandler'

class Address {
    async list(req: Request, res: Response) {
        const {
            filterColumn, filterValue, sortColumn, sortValue, pgColumn, pgOperator, pgLastItem
        } = req.query
        const limit = req.query.limit || 100

        try {
            const Address = new AddressModel()
            const addresses = await Address.find({
                filterColumn, filterValue, sortColumn, sortValue,
                pgColumn, pgOperator, pgLastItem, limit
            })

            res.status(200).json({
                success: 1,
                data: addresses
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async create(req: Request, res: Response) {
        const {
            user_id, tag, address_one, address_two,
            city, postcode, state
        } = req.body

        try {
            const Address = new AddressModel()
            await Address.save({
                user_id,
                tag,
                address_one,
                address_two,
                city,
                postcode,
                state
            })

            res.status(201).json({
                success: 1,
                msg: 'Address added.'
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    // TODO: async update(req: Request, res: Response) {} 
}

export default new Address