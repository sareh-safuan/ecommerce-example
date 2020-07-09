import { body, validationResult } from 'express-validator'
import warningLogger from '../../utils/warningLogger'
import erroHandler from '../../utils/errorHandler'

export const addAddress = (req: any, res: any, next: any) => {
    Promise
        .all([
            body('user_id')
                .trim()
                .notEmpty().withMessage('userId can\'t empty')
                .isNumeric().withMessage('userId should be numeric')
                .custom(val => {
                    // To check if same as session
                    return true
                }).withMessage('userId not same as in session')
                .run(req),
            body('tag')
                .trim()
                .notEmpty().withMessage('address tag cannot be empty')
                .isLength({ min: 1, max: 50 }).withMessage('between 1 to 50 chars')
                .run(req),
            body('address_one')
                .trim()
                .notEmpty().withMessage('address one can\'t empty')
                .isLength({ min: 5, max: 250 }).withMessage('between 5 to 250 chars')
                .run(req),
            body('address_two')
                .trim()
                .isLength({ max: 250 }).withMessage('max 250 characters')
                .run(req),
            body('city')
                .trim()
                .notEmpty().withMessage('city can\'t empty')
                .isLength({ min: 1, max: 50 }).withMessage('between 1 to 50 characters')
                .run(req),
            body('postcode')
                .trim()
                .notEmpty().withMessage('postcode can\'t empty')
                .isLength({ min: 5, max: 10 }).withMessage('between 5 to 10 digits')
                .isNumeric().withMessage('must be numeric')
                .run(req),
            body('state')
                .trim()
                .notEmpty().withMessage('state can\'t empty')
                .isLength({ min: 5, max: 50 }).withMessage('between 5 to 50 characters')
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
            erroHandler(req, res, err.message)
        })
}