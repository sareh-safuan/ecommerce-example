import express  from 'express'
import morgan from 'morgan'
import userController from './controller/userController'

const app = express()

app.use(express.json())
app.use(morgan('short'))

app.use('/user', userController)

export default app