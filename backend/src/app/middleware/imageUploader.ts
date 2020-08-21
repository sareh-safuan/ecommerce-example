import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import path from 'path'
import errorHandler from '../../utils/errorHandler'

const dest = path.join(__dirname, '../../../../upload')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, dest)
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname)
        const filename = Date.now()
        cb(null, filename + ext)
    }
})
const upload = multer({ storage }).single('image')

const imageUploader = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err: any) => {
        if (err) {
            errorHandler(req, res, err.message)
        }

        if (!req.file) {
            return res.status(400).json({
                success: 0,
                msg: 'Please upload product image.'
            })
        }

        req.body.image = req.file.filename

        next()
    })
}

export default imageUploader