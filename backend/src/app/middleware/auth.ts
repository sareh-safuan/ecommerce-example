import { Request, Response, NextFunction } from 'express'

export const isLogin = (req: Request, res: Response, next: NextFunction) => {

    if (!req!.session!.user) {
        return res.status(401).json({
            success: 0,
            msg: 'Please login before continue.'
        })
    }

    next()
}

export const selfAccess = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req!.session!.user
    const paramId = req.params.id || req.params.userId

    if (id !== +paramId) {
        return res.status(403).json({
            success: 0,
            msg: 'Access is forbidden.'
        })
    }

    next()
}

export const accessControl = (req: any, res: any, next: any) => {

    const { id } = req.session.user
    const { id: param_id } = req.params

    if (id !== +param_id) {
        return res.status(403).json({
            success: 0,
            msg: 'Access is forbidden.'
        })
    }

    next()
}