
exports.up = function(knex) {
    return knex.schema.alterTable('addresses', function (table) {
        table
            .specificType('country_id', 'SMALLINT')
            .after('state')
            .notNullable()
            .unsigned()
    })
};

exports.down = function(knex) {
  
};
