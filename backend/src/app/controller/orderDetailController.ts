import { Request, Response } from 'express'
import OrderDetailModel from '../../database/models/orderDetailModel'
import errorHandler from '../../utils/errorHandler'

class OrderDetail {
    async update(req: Request, res: Response) {
        const { status_id } = req.body
        const id = req.params.order_detail

        try {
            const OrderDetail = new OrderDetailModel()
            await OrderDetail.update({ id }, { status_id })

            res.status(200).json({
                success: 1,
                msg: 'Order is updated.'
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }
}

export default new OrderDetail