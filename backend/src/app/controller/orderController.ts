import { Request, Response } from 'express'
import OrderModel from '../../database/models/orderModel'
import OrderDetailModel from '../../database/models/orderDetailModel'
import errorHandler from '../../utils/errorHandler'

class Order {
    async list(req: Request, res: Response) {
        const { userId } = req.params
        
        try {        
            const Order = new OrderModel()
            const orders = await Order.findBy('user_id', userId)
            const orderIds = orders.map(_ => _.id)
            const OrderDetail = new OrderDetailModel()

            const orderDetails = await OrderDetail
                .query()
                .select(
                    'orderdetails.order_id', 'orderdetails.paying_price', 'orderdetails.quantity',
                    'b.image', 'b.product_name',
                    'c.variation_description',
                )
                .leftJoin('products as b', 'b.id', 'orderdetails.product_id')
                .leftJoin('productvariations as c', 'c.id', 'orderdetails.product_variation_id')
                .whereIn('orderdetails.order_id', orderIds)

            const result = orders.map(o => {
                let products: any = []

                orderDetails.forEach(od => {
                    if (o.id === od.order_id) {
                        products.push(od)
                    }
                })

                return {
                    id: o.id,
                    total_price_paid: o.total_price_paid,
                    created_at: o.created_at,
                    products
                }
            })

            res.status(200).json({
                success: 1,
                data: result
            })

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