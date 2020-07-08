
exports.up = function(knex) {
    return knex.schema.alterTable('productvariations', function (table) {
        table.string('variation_description', 50)
            .alter()
            .notNullable()
    })
};

exports.down = function(knex) {
  
};
