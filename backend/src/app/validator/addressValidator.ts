import { body, validationResult } from 'express-validator'
import warningLogger from '../../utils/warningLogger'
import erroHandler from '../../utils/errorHandler'

export const addAddress = (req: any, res: any, next: any) => {
    Promise
        .all([])
        .then(res => {})
        .catch(err => {
            erroHandler(req, res, err.message)
        })
}