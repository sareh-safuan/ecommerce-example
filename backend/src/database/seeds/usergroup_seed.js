
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usergroups').del()
    .then(function () {
      // Inserts seed entries
      return knex('usergroups').insert([
        {
          description: "Web Administrator"
        },
        {
          description: "Worker"
        },
        {
          description: "Buyer"
        }
      ]);
    });
};
