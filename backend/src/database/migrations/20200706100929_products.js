
exports.up = function(knex) {
    return knex.schema.alterTable('products', function (table) {
        table.string('description', 250).alter().notNullable()
        table.string('image', 100).alter().notNullable()
        table.dropColumn('price')
    })
};

exports.down = function(knex) {
  
};
