import express from 'express'
import path from 'path'
import serverMiddleware from '../serverMiddleware'
import Route from '../routes'

const app = express()
const routeList = Route.list()

app.use('/images', express.static(path.join(__dirname, '../../../upload')))

serverMiddleware.forEach(sm => {
    app.use(sm)
})

routeList.forEach(rl => {
    app.use(rl.basePath, rl.router)
})

export default app