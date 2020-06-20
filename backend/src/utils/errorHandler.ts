import logger from './logger'

const errorHandler = (req: any, res: any, errorMessage: string) => {
    logger.error(
        `[${req.method}] ${req.originalUrl} | ${errorMessage}`
    )
    return res.status(500).json({
        success: 0,
        msg: 'Unexpected error. Please try again later.'
    })
}

export default errorHandler