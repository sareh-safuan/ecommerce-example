
exports.up = function(knex) {
    return knex.schema.alterTable('products', function (table) {
        table
            .decimal('display_price')
            .after('slug')
            .notNullable()
            .unsigned()
    })
};

exports.down = function(knex) {
  
};
