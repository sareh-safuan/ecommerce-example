
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {
          user_id: 5,
          address_id: 4,
          total_price_paid: 64.48
        },
        {
          user_id: 6,
          address_id: 8,
          total_price_paid: 209.65
        },
        {
          user_id: 7,
          address_id: 15,
          total_price_paid: 76.36
        },
        {
          user_id: 5,
          address_id: 4,
          total_price_paid: 93.38
        },
        {
          user_id: 8,
          address_id: 1,
          total_price_paid: 122.04
        },
        {
          user_id: 9,
          address_id: 19,
          total_price_paid: 131.68
        },
        {
          user_id: 7,
          address_id: 15,
          total_price_paid: 121.20
        },
        {
          user_id: 5,
          address_id: 4,
          total_price_paid: 100.89
        },
        {
          user_id: 10,
          address_id: 24,
          total_price_paid: 179.05
        },
        {
          user_id: 8,
          address_id: 10,
          total_price_paid: 112.07
        },
        {
          user_id: 6,
          address_id: 8,
          total_price_paid: 173.47
        },
        {
          user_id: 5,
          address_id: 4,
          total_price_paid: 86.87
        },
        {
          user_id: 10,
          address_id: 20,
          total_price_paid: 93.48
        },
        {
          user_id: 7,
          address_id: 15,
          total_price_paid: 73.64
        },
        {
          user_id: 8,
          address_id: 1,
          total_price_paid: 162.91
        }
      ]);
    });
};