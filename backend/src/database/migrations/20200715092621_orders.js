
exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
        table.increments()
        table.integer('user_id').unsigned().notNullable()
        table.integer('address_id').unsigned().notNullable()
        table.decimal('total_price_paid').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').nullable()
    })
};

exports.down = function (knex) {

};
