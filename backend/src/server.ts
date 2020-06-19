import http from 'http'
import app from './app/app'

const server = http.createServer(app)

server.listen(3000, () => {
    console.log('Server running at port 3000')
})