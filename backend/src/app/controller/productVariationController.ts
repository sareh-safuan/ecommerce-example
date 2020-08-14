import { Request, Response } from 'express'
import ProductVariationModel from '../../database/models/productvariationModel'
import errorHandler from '../../utils/errorHandler'

class ProductVariation {
    async list(req: Request, res: Response) {
        const {
            filterColumn, filterValue, sortColumn, sortValue, pgColumn, pgOperator, pgLastItem
        } = req.query
        const limit = req.query.limit || 100

        try {
            const ProductVariation = new ProductVariationModel()
            const productVariations = await ProductVariation.find({
                filterColumn, filterValue, sortColumn, sortValue,
                pgColumn, pgOperator, pgLastItem, limit
            })

            res.status(200).json({
                success: 1,
                data: productVariations
            })
        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params

        try {
            const ProductVariation = new ProductVariationModel()
            const productVariation = await ProductVariation.find({
                filterColumn: 'id',
                filterValue: id
            })

            res.status(200).json({
                success: 1,
                data: productVariation
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async create(req: Request, res: Response) {
        const { product_variation } = req.body

        try {
            const ProductVariation = new ProductVariationModel()
            await ProductVariation.save(product_variation)

            res.status(201).json({
                success: 1,
                msg: 'Product variations added.'
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async update(req: Request, res: Response) { }
}

export default new ProductVariation
