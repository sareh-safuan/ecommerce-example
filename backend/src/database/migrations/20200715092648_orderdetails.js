
exports.up = function(knex) {
    return knex.schema.createTable('orderdetails', function (table) {
        table.increments()
        table.integer('order_id').unsigned().notNullable()
        table.integer('product_id').unsigned().notNullable()
        table.integer('product_variation_id').unsigned().notNullable()
        table.decimal('paying_price').unsigned().notNullable()
        table.specificType('quantity', 'smallint(5)').unsigned().notNullable()
        table.specificType('status_id', 'tinyint(1)').unsigned().notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').nullable()
    })
};

exports.down = function(knex) {
  
};
