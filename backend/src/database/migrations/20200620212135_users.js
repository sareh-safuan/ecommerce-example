
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments()
        table.string('first_name', 20).notNullable()
        table.string('last_name', 20).notNullable()
        table.string('email', 50).unique().notNullable()
        table.string('phone_number', 20).notNullable()
        table.specificType('hash', 'char(60)').notNullable()
        table.string('avatar', '20').defaultTo('avatar.png')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').nullable()
    })
};

exports.down = function (knex) {

};
