import { body, validationResult } from 'express-validator'
import errorHandler from '../../utils/errorHandler'
import warningLogger from '../../utils/warningLogger'

export const addProduct = (req: any, res: any, next: any) => {
    Promise
        .all([
            body('product_name')
                .trim()
                .notEmpty()
                .isLength({ min: 2, max: 20 })
                .run(req),
            body('description')
                .trim()
                .notEmpty().withMessage('kenot')
                .isLength({ min: 10, max: 250 }).withMessage('why')
                .run(req),
            body('image')
                .trim()
                .notEmpty()
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

export const addProductVariation = (req: any, res: any, next: any) => {
    Promise
        .all([
            body('product_variation')
            .notEmpty()
            .run(req),
            body('product_variation.*.product_id')
                .trim()
                .notEmpty()
                .isNumeric()
                .run(req),
            body('product_variation.*.variation_description')
                .trim()
                .notEmpty()
                .isLength({ min: 2, max: 50 })
                .run(req),

            body('product_variation.*.quantity')
                .trim()
                .notEmpty()
                .isNumeric()
                .run(req),
            body('product_variation.*.price')
                .trim()
                .notEmpty()
                .isNumeric()
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

