
exports.up = function(knex) {
    return knex.schema.alterTable('orders', function (table) {
        table
            .specificType('status_id', 'TINYINT(1)')
            .after('address_id')
            .notNullable()
            .unsigned()
    })
};

exports.down = function(knex) {
  
};
