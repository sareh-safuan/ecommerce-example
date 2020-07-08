
exports.up = function (knex) {
    return knex.schema.createTable('products', function (table) {
        table.increments()
        table.string('product_name', 20).notNullable()
        table.string('slug', 40).notNullable()
        table.string('description', 50).notNullable()
        table.string('image', 30).notNullable()
        table.decimal('price').notNullable().unsigned()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').nullable()
    })
};

exports.down = function (knex) {

};
