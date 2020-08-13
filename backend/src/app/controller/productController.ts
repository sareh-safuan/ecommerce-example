import { Request, Response } from 'express'
import slugify from 'slugify'
import ProductModel from '../../database/models/productModel'
import ProductVariationModel from '../../database/models/productvariationModel'
import errorHandler from '../../utils/errorHandler'

class Product {
    async list(req: Request, res: Response) {
        try {
            const Product = new ProductModel()
            const products = await Product
                .query()
                .join('productvariations', 'products.id', '=', 'productvariations.product_id')
                .select(
                    'products.id', 'products.product_name', 'products.slug',
                    'products.image', 'products.description'
                )
                .min('productvariations.price as price')
                .groupBy('products.id')
                .limit(12)

            res.status(200).json({
                success: 1,
                data: products
            })

        } catch (err) {
            errorHandler(req, res, err.message)
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const { id } = req.params
            const Product = new ProductModel()
            const products = await Product
                .query()
                .join('productvariations as b', 'products.id', '=', 'b.product_id')
                .select(
                    'products.product_name', 'products.image', 'products.description',
                    'b.id', 'b.price', 'b.variation_description', 'b.quantity'
                )
                .where('products.id', id)

            const { product_name, image, description } = products[0]
            const variations = products.map(el => {
                return {
                    id: el.id,
                    price: el.price,
                    variation_description: el.variation_description,
                    quantity: el.quantity
                }
            })

            res.status(200).json({
                success: 1,
                data: {
                    product_name,
                    image,
                    description,
                    variations
                }
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

    async createVariation(req: Request, res: Response) {
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

    async updateVariation(req: Request, res: Response) { }
}

export default new Product