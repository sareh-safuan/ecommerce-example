import { Request, Response } from 'express'
import ProductVariantModel from '../../database/models/productVariantModel'
import errorHandler from '../../utils/errorHandler'

class ProductVariant {

    async create(req: Request, res: Response) {
        const { product_variation } = req.body

        try {
            const ProductVariant = new ProductVariantModel()
            await ProductVariant.save(product_variation)

            res.status(201).json({
                success: 1,
                msg: 'Product variants added.'
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async update(req: Request, res: Response) { }
}

export default new ProductVariant
