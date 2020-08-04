import logger from '../config/logger'

interface ValidationError {
    value?: any,
    msg: 'string',
    param: 'string',
    location: 'string'
}

export const failedValidationLogger = (errors: Array<any>) => {
    let message = ''
    
    errors.forEach((obj: any) => {
        message += 
            `value=${obj.value},msg=${obj.msg},param=${obj.param},location=${obj.location}|`
    })
    logger.warn(message)
}

export const failedRequestLogger = () => {}