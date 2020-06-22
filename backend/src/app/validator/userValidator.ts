import { body, validationResult } from 'express-validator'
import UserModel from '../../database/models/userModel'
import errorHandler from '../../utils/errorHandler'

export const registerUser = (req: any, res: any, next: any) => {
    // TODO; sanitive input
    Promise.all([
        body('first_name', 'First name is required.')
            .notEmpty()
            .isLength({ max: 20 })
            .run(req),
        body('last_name', 'Last name is required.')
            .notEmpty()
            .isLength({ max: 20 })
            .run(req),
        body('email')
            .notEmpty().withMessage('Email is required.')
            .isLength({ max: 50 })
            .isEmail().withMessage('Invalid email format.')
            .bail()
            .custom(value => {
                return new UserModel().findOne('email', value)
                    .then(user => {
                        if (user.length) {
                            return Promise.reject('Email already registered.')
                        }
                    })
            })
            .run(req),
        body('phone_number', 'Invalid phone number')
            .notEmpty()
            .isLength({ max: 20 })
            .run(req),
        body('password')
            .notEmpty().withMessage('Password is required.')
            .isLength({ min: 8 }).withMessage('Password should be more than 8 characters.')
            .run(req),
        body('password_confirmation')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation not matched with password.')
                }

                return true
            })
            .run(req),
        body('usergroup_id', 'Error when registering. Please try again.')
            .isNumeric()
            .run(req)
    ])
    .then(() => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
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