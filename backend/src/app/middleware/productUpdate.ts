import { Request, Response, NextFunction } from 'express'
import slugify from 'slugify'

export const updateProductInfo = (req: Request, res: Response, next: NextFunction) => {
    const { product_name, display_price, description } = req.body
    const slug = slugify(product_name, { lower: true })

    req.body = Object.assign({}, {
        product_name,
        slug,
        display_price,
        description
    })

    next()
}