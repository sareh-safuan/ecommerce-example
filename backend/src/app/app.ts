import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import path from 'path'
import sessionSetting from '../utils/sessionSetting'
import userController from './controller/userController'
import productController from './controller/productController'
import addressController from './controller/addressController'

const app = express()

app.use(express.static(path.join(__dirname, '../../../upload')))
app.use(express.json())
app.use(morgan('short'))
app.use(session(sessionSetting()))

app.use('/user', userController)
app.use('/product', productController)
app.use('/address', addressController)

export default app