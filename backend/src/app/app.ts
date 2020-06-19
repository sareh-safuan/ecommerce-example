import express  from 'express'
import userController from './controller/userController'

const app = express()

app.use(express.json())

app.use('/user', userController)

export default app