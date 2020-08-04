import knex from 'knex'

const connection = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'secret',
        database: 'ecommerce'
    },
    pool: {
        min: 0,
        max: 7
    }
})

export default connection

