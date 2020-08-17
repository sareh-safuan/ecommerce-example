import { Request, Response } from 'express'
import OrderModel from '../../database/models/orderModel'
import errorHandler from '../../utils/errorHandler'

class Order {
    async index(req: Request, res: Response) {
        const { user } = req.params
        const limit = parseInt(req.query.limit as string) || 50
        const last = parseInt(req.query.last as string)

        try {
            const Order = new OrderModel()
            const query = Order.query()

            if (user) {
                query
                    .where('user_id', user)
            }

            if (last) {
                query.where('orders.id', '>', last)
            }

            const orders = await query.limit(limit)

            res.json({ data: orders })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async create(req: Request, res: Response) {
        const { user_id, address_id, total_price_paid, orders } = req.body

        try {
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
    }
}

export default new Order