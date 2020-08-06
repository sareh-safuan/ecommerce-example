
exports.up = function(knex) {
    return knex.schema.createTable('orderstatus', function (table) {
        table.increments()
        table.string('description', 20).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
  
};
