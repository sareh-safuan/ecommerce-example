
exports.up = function(knex) {
    return knex.schema.alterTable('orderdetails', function (table) {
        table.specificType('status_id', 'tinyint(1)')
            .notNullable().unsigned().defaultTo(1).alter()
    })
};

exports.down = function(knex) {
  
};
