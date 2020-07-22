import { Router } from 'express'
import { createOrder } from '../validator/orderValidator'
import OrderModel from '../../database/models/orderModel'
import OrderDetailModel from '../../database/models/orderDetailModel'
import errorHandler from '../../utils/errorHandler'

const router = Router()

router.get('/', async (req: any, res: any) => {

    try {

        const Order = new OrderModel()
        const OrderDetail = new OrderDetailModel()
        const orders = await Order.findAll()
        const orderDetails = await OrderDetail.findAll()

        res.json({
            orders,
            orderDetails
        })

    } catch (err) {
        errorHandler(req, res, err.message)
    }

})

router.post(
    '/create',
    [createOrder],
    async (req: any, res: any) => {

        try {

            const { user_id, address_id, total_price_paid, orders } = req.body
            const Order = new OrderModel()
            await Order.transaction(async (trx: any) => {
                const id = await trx.insert({
                    user_id, address_id, total_price_paid
                }).into('orders')

                orders.forEach((order: any) => order.order_id = id[0])
                const done = await trx('orderdetails').insert(orders)
                return done
            })

            res.status(201).json({
                success: 1,
                msg: 'Order is placed.'
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    })

export default router