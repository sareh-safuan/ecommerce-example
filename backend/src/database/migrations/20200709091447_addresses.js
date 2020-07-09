
exports.up = function (knex) {
    return knex.schema.createTable('addresses', function (table) {
        table.increments()
        table.integer('user_id').unsigned().notNullable()
        table.string('tag', 50).notNullable()
        table.string('address_one', 250).notNullable()
        table.string('address_two', 250).notNullable()
        table.string('city', 50).notNullable()
        table.string('postcode', 10).notNullable()
        table.string('state', 50).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').nullable()
    })
};

exports.down = function (knex) {

};
