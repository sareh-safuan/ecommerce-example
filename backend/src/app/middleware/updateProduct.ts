import { Request, Response, NextFunction } from 'express'
import slugify from 'slugify'

export const updateProductInfo = (req: Request, res: Response, next: NextFunction) => {
    const slug = slugify(req.body.product_name, { lower: true })

    req.body.slug = slug

    next()
}