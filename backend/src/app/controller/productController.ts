import { Request, Response } from 'express'
import slugify from 'slugify'
import ProductModel from '../../database/models/productModel'
import errorHandler from '../../utils/errorHandler'

class Product {
    async index(req: Request, res: Response) {
        const limit = parseInt(req.query.limit as string) || 20

        try {
            const Product = new ProductModel()
            const products = await Product
                .query()
                .join(
                    'productvariations', 'products.id',
                    '=', 'productvariations.product_id'
                )
                .select(
                    'products.id', 'products.product_name',
                    'products.slug', 'products.image',
                    'products.description'
                )
                .min('productvariations.price as price')
                .groupBy('products.id')
                .limit(limit)

            res.status(200).json({
                success: 1,
                data: products
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async show(req: Request, res: Response) {
        const { product } = req.params

        try {
            const Product = new ProductModel()
            const query = Product.query()
                .select()
                .join(
                    'productvariations', 'products.id',
                    '=', 'productvariations.product_id'
                )
                .where('products.id', product)
            const data = await query

            res.status(200).json({
                data
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async create(req: Request, res: Response) {
        const {
            product_name,
            description,
            image
        } = req.body
        const slug = slugify(product_name, { lower: true })

        try {
            const Product = new ProductModel()
            await Product.save({
                product_name,
                slug,
                description,
                image
            })

            res.status(201).json({
                success: 1,
                msg: 'Product created.'
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async update(req: Request, res: Response) { }
}

export default new Product