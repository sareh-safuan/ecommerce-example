import { Request, Response, NextFunction } from 'express'
import path from 'path'
import errorHandler from '../../utils/errorHandler'
// @ts-ignore  
import { IncomingForm } from 'formidable'

/**
 * Better solution is upload to external services to handle file
 */

const imageUploader = (req: Request, res: Response, next: NextFunction) => {
    const uploadDir = path.join(__dirname, '../../../../upload')
    const form = new IncomingForm({
        uploadDir,
        multiples: true,
        keepExtensions: true
    })

    form.parse(req, (err: any, fields:any, files: any) => {
        if (err) {
            errorHandler(req, res, err.message)
        }

        if (Object.keys(files).length === 0) {
            return res.status(400).json({
                success: 0,
                msg: 'Please upload product image.'
            })
        }

        /*
            TODO: Only works with one image with field name image
        */
        const image = path.win32.basename(files.image.path)
        req.body = {
            ...fields,
            image
        }        
        next()
    })
}

export default imageUploader