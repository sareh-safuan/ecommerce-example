import { body, validationResult } from 'express-validator'

export const registerUser = (req: any, res: any, next: any) => {

    Promise.all([
        body('first_name', 'First name is required.')
            .notEmpty()
            .run(req),
        body('last_name', 'Last name is required.')
            .notEmpty()
            .run(req),
        body('email')
            .notEmpty().withMessage('Email is required.')
            .isEmail().withMessage('Invalid email format.')
            .run(req),
        body('phone_number', 'Invalid phone number')
            .notEmpty()
            .run(req),
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8 }).withMessage('Password should be more than 8 characters')
            .run(req),
        body('password_confirmation')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation not matched with password')
                }

                return true
            })
            .run(req),
        body('usergroup_id', 'Error when registering. Please try again.')
            .isNumeric()
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
        console.log(err) // TODO change to logger

        return res.status(500).json({
            success: 0,
            msg: 'Server error.'
        })
    })

}