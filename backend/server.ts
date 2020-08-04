import http from 'http'
import app from './src/bootstrap/index'

const server = http.createServer(app)
const port = process.env.PORT as string

server.listen(port, () => {
    console.log('Server running at port ' + port)
})