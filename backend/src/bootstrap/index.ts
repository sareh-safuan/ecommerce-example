import express from 'express'
import serverMiddleware from '../serverMiddleware'
import Route from '../routes'

const app = express()
const routeList = Route.list()

serverMiddleware.forEach(sm => {
    app.use(sm)
})

routeList.forEach(rl => {
    app.use(rl.basePath, rl.router)
})

export default app