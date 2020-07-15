import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import errorHandler from '../../utils/errorHandler'
import warningLogger from '../../utils/warningLogger'

export const createOrder = (req: any, res: any, next: any) => {
    Promise
        .all([
            body('user_id')
                .trim()
                .notEmpty().withMessage('user id can\'t empty')
                .isNumeric().withMessage('user id must be numeric')
                .run(req),
            body('address_id')
                .trim()
                .notEmpty().withMessage('address id can\'t empty')
                .isNumeric().withMessage('address id must be numeric')
                .run(req),
            body('total_price_paid')
                .trim()
                .notEmpty().withMessage('total price can\'t empty')
                .isNumeric().withMessage('total price must be numeric')
                .run(req),
            body('orders', 'Orders can\'t be empty')
                .notEmpty()
                .run(req),
            body('orders.*.product_id')
                .trim()
                .notEmpty().withMessage('product id can\'t empty')
                .isNumeric().withMessage('product id must be numeric')
                .run(req),
            body('orders.*.product_variation_id')
                .trim()
                .notEmpty().withMessage('product variation id can\'t empty')
                .isNumeric().withMessage('product variation id must be numeric')
                .run(req),
            body('orders.*.paying_price')
                .trim()
                .notEmpty().withMessage('paying price can\'t empty')
                .isNumeric().withMessage('paying price must be numeric')
                .run(req),
            body('orders.*.quantity')
                .trim()
                .notEmpty().withMessage('quantity can\'t empty')
                .isNumeric().withMessage('quantity id must be numeric')
                .run(req)
        ])
        .then(() => {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                warningLogger(errors.array())

                return res.status(400).json({
                    success: 0,
                    msg: errors.array()
                })
            }

            next()
        })
        .catch(err => {
            errorHandler(req, res, err.message)
        })
}

// user_id: 1,
//     address_id: 1,
//         total_price_paid: 94.98,
//             orders: [