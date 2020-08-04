import morgan from 'morgan'
import express from 'express'
import session from 'express-session'
import sessionSetting from './config/sessionSetting'

const serverMiddleware = [
    express.json(),
    morgan('dev'),
    session(sessionSetting())
]

export default serverMiddleware