import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import sessionSetting from '../utils/sessionSetting'
import userController from './controller/userController'
import productController from './controller/productController'

const app = express()

app.use(express.json())
app.use(morgan('short'))
app.use(session(sessionSetting()))

app.use('/user', userController)
app.use('/product', productController)

export default app