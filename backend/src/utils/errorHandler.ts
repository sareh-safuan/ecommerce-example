import { Request, Response } from 'express'
import logger from '../config/logger'

const errorHandler = (req: Request, res: Response, errorMessage: string) => {
    logger.error(
        `[${req.method}] ${req.originalUrl} | ${errorMessage}`
    )
    
    return res.status(500).json({
        success: 0,
        msg: 'Unexpected error. Please try again later.'
    })
}

export default errorHandler