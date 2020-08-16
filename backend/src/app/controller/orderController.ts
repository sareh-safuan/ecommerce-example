import { Request, Response } from 'express'
import OrderModel from '../../database/models/orderModel'
import OrderDetailModel from '../../database/models/orderDetailModel'
import errorHandler from '../../utils/errorHandler'

class Order {
    async index(req: Request, res: Response) {
        const { user } = req.params
        const limit = parseInt(req.query.limit as string) || 50
        const last = parseInt(req.query.last as string)

        try {
            const Order = new OrderModel()
            const query = Order.query()
                .join('orderdetails', 'orderdetails.order_id', '=', 'orders.id')

            if (user) {
                query
                    .join(
                        'productvariations', 'productvariations.id',
                        '=', 'orderdetails.product_variation_id'
                    )
                    .join('products', 'productvariations.product_id', '=', 'products.id')
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

    async show(req: Request, res: Response) {
        const { order } = req.params

        try {
            const Order = new OrderModel()
            const query = Order.query()
                .select(
                    'orders.*', 'orderdetails.*', 'addresses.*',
                    'productvariations.variation_description'
                )
                .leftJoin('orderdetails', 'orderdetails.order_id', '=', 'orders.id')
                .leftJoin(
                    'productvariations', 'productvariations.id',
                    '=', 'orderdetails.product_variation_id'
                )
                .leftJoin('products', 'productvariations.product_id', '=', 'products.id')
                .leftJoin('addresses', 'addresses.user_id', '=', 'orders.user_id')
                .where('orders.id', order)

            console.log(query.toSQL().sql)

            const data = await query

            res.json({ data })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async list(req: Request, res: Response) {
        const {
            filterColumn, filterValue, sortColumn, sortValue, pgColumn, pgOperator, pgLastItem
        } = req.query
        const limit = req.query.limit || 100

        try {
            const Order = new OrderModel()
            const orders = await Order.find({
                filterColumn, filterValue, sortColumn, sortValue,
                pgColumn, pgOperator, pgLastItem, limit
            })

            res.status(200).json({
                success: 1,
                data: orders
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