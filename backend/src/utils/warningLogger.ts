import logger from './logger'

interface ValidationError {
    value: any,
    msg: 'string',
    param: 'string',
    location: 'string'
}

const warningLogger = (errors: Array<ValidationError>| any) => {
    let message = ''
    errors.forEach((obj: any) => {
        message += `value=${obj.value},msg=${obj.msg},param=${obj.param},location=${obj.location}|`
    })
    logger.warn(message)
}

export default warningLogger