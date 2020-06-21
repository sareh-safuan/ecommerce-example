
exports.up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table
            .specificType('usergroup_id', 'TINYINT(1)')
            .after('avatar')
            .notNullable()
    })
};

exports.down = function(knex) {
  
};
