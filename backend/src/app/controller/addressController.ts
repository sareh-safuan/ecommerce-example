import { Router } from 'express'
import { addAddress } from '../validator/addressValidator'
import AddressModel from '../../database/models/addressModel'
import errorHandler from '../../utils/errorHandler'

const router = Router()

router.get('/', async (req: any, res: any) => {

    try {

        const Address = new AddressModel()
        const addresses = await Address.findAll()

        res.json({ addresses })

    } catch (err) {
        errorHandler(req, res, err.message)
    }

})

router.post(
    '/create',
    [addAddress],
    async (req: any, res: any) => {

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
    })

router.get(
    '/:id',
    async (req: any, res: any) => {

        try {
        
            const { id } = req.params
            const Address = new AddressModel()
            const addresses = await Address.findBy('user_id', id)

            res.status(200).json({
                success: 1,
                data: addresses
            })

        } catch (err) {
            errorHandler(req, res, err.message)   
        }
    })

export default router