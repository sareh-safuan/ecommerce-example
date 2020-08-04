import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import UserModel from '../../database/models/userModel'
import errorHandler from '../../utils/errorHandler'
import { failedValidationLogger } from '../../utils/logger'

export const vUserRegister = (req: Request, res: Response, next: NextFunction) => {
    Promise.all([
        body('first_name', 'First name is required.')
            .notEmpty()
            .isLength({ max: 20 })
            .trim()
            .run(req),
        body('last_name', 'Last name is required.')
            .notEmpty()
            .isLength({ max: 20 })
            .trim()
            .run(req),
        body('email')
            .notEmpty().withMessage('Email is required.')
            .isLength({ max: 50 })
            .isEmail().withMessage('Invalid email format.')
            .bail()
            .custom(value => {
                return new UserModel().findBy('email', value)
                    .then(user => {
                        if (user.length) {
                            return Promise.reject('Email already registered.')
                        }
                    })
            })
            .trim()
            .run(req),
        body('phone_number', 'Invalid phone number')
            .notEmpty()
            .isLength({ max: 20 })
            .trim()
            .run(req),
        body('password')
            .notEmpty().withMessage('Password is required.')
            .isLength({ min: 8 }).withMessage('Password should be more than 8 characters.')
            .trim()
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
            .trim()
            .run(req)
    ])
        .then(() => {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                failedValidationLogger(errors.array())

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

export const vUserLogin = (req: Request, res: Response, next: NextFunction) => {
    Promise.all([
        body('email')
            .notEmpty().withMessage('Email is required.')
            .isEmail().withMessage('Invalid email.')
            .trim()
            .run(req),
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8 }).withMessage('Password should have more than 8 characters')
            .trim()
            .run(req),
    ])
        .then(() => {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                failedValidationLogger(errors.array())

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

export const vUserChangePassword = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    Promise.all([
        body('currentPassword')
            .trim()
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8 }).withMessage('Password should have more than 8 characters')
            .custom((value) => {
                return new UserModel().findBy('id', id)
                    .then(user => {
                        const { hash } = user[0]

                        return bcrypt.compare(value, hash)
                    })
                    .then(isMatch => {
                        if (!isMatch) {
                            return Promise.reject('Current password is incorrect.')
                        }
                    })
            })
            .run(req),
        body('newPassword')
            .trim()
            .notEmpty().withMessage('New password is required')
            .isLength({ min: 8 }).withMessage('Password should have more than 8 characters')
            .custom((value, { req }) => {
                if (value === req.body.currentPassword) {
                    throw new Error('New password cannot same as current password.')
                }

                return true
            })
            .run(req),
        body('newPasswordConfirmation')
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error('Password confirmation not matched with password.')
                }

                return true
            })
            .run(req)
    ])
        .then(() => {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                failedValidationLogger(errors.array())

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

export const vUserUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id

    Promise
        .all([
            body('first_name', 'First name is required.')
                .notEmpty()
                .isLength({ max: 20 })
                .trim()
                .run(req),
            body('last_name', 'Last name is required.')
                .notEmpty()
                .isLength({ max: 20 })
                .trim()
                .run(req),
            body('email')
                .notEmpty().withMessage('Email is required.')
                .isLength({ max: 50 })
                .isEmail().withMessage('Invalid email format.')
                .bail()
                .custom(value => {
                    return new UserModel().findBy('email', value)
                        .then(user => {
                            if (user.length) {
                                const { id } = user[0]

                                if (id != userId) {
                                    return Promise.reject('Email already registered.')
                                }
                            }
                        })
                })
                .trim()
                .run(req),
            body('phone_number', 'Invalid phone number')
                .notEmpty()
                .isLength({ max: 20 })
                .trim()
                .run(req)
        ])
        .then(() => {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                failedValidationLogger(errors.array())

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