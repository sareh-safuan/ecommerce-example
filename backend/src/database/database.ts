import _knex from 'knex'

const database = _knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'secret',
        database: 'ecommerce'
    },
    pool: {
        min: 0,
        max: 5
    }
})

export default database

