
exports.up = function (knex) {
    return knex.schema.createTable('productvariations', function (table) {
        table.increments()
        table.integer('product_id').notNullable()
        table.string('variation_description', 10).notNullable()
        table.decimal('price').notNullable().unsigned()
        table.specificType('quantity', 'smallint').notNullable().unsigned()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').nullable()
    })
};

exports.down = function (knex) {

};
