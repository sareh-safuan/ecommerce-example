import { Router } from 'express'
import slugify from 'slugify'
import imageHandler from '../middleware/imageHandler'
import { addProduct, addProductVariation } from '../validator/productValidator'
import ProductModel from '../../database/models/productModel'
import ProductVariationModel from '../../database/models/productvariationModel'
import errorHandler from '../../utils/errorHandler'

const router = Router()

router.post(
    '/create',
    [imageHandler, addProduct],
    async (req: any, res: any) => {

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
    })


router.post(
    '/create-variation',
    [addProductVariation],
    async (req: any, res: any) => {

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
    })

router.get(
    '/',
    async (req: any, res: any) => {

        try {

            const Product = new ProductModel()
            const products = await Product.query()
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
    })

router.get(
    '/:id',
    async (req: any, res: any) => {

        try {
            
            const { id } = req.params
            const Product = new ProductModel()
            const products = await Product.query()
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

        /**
         * 
         * SELECT
            b.id, b.price, b.variation_description, b.quantity
            FROM products AS a
            LEFT JOIN productvariations AS b ON a.id = b.product_id WHERE a.id = 1
         * 
         */

    })

export default router