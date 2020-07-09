import { Router } from 'express'

const router = Router()

router.post(
    '/create',
    async (req: any, res: any) => {

        res.status(201).json({
            success: 201,
            msg: 'Address added.'
        })
    })

export default router