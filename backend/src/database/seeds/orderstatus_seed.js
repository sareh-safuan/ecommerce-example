
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orderstatus').del()
    .then(function () {
      // Inserts seed entries
      return knex('orderstatus').insert([
        {
          description: "PLACED"
        },
        {
          description: "PAID"
        },
        {
          description: "PROCESSING"
        },
        {
          description: "SHIPPING"
        },
        {
          description: "DELIVERED"
        },
        {
          description: "CANCELLED"
        }
      ]);
    });
};
