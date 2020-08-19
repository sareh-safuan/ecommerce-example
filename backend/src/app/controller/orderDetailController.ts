import { Request, Response } from 'express'
import OrderDetailModel from '../../database/models/orderDetailModel'
import errorHandler from '../../utils/errorHandler'

class OrderDetail {
    async index(req: Request, res: Response) {
        const { order } = req.params

        try {
            const OrderDetail = new OrderDetailModel()
            const orderDetails = await OrderDetail.query()
                .select()
                .leftJoin('products', 'orderdetails.product_id', '=', 'products.id')
                .leftJoin(
                    'productvariations', 'orderdetails.product_variation_id',
                    '=', 'productvariations.id'
                )
                .where('order_id', order)

            res.status(200).json({ data: orderDetails })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }
}

export default new OrderDetail