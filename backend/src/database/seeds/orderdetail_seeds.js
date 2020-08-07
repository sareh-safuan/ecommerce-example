
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('orderdetails').del()
    .then(function () {
      // Inserts seed entries
      return knex('orderdetails').insert([
        {
          order_id: 1,
          quantity: 1,
          status_id: 1,
          product_id: 7,
          paying_price: 28.23,
          product_variation_id: 19
        },
        {
          order_id: 1,
          quantity: 1,
          status_id: 1,
          product_id: 10,
          paying_price: 31.25,
          product_variation_id: 29
        },
        {
          order_id: 2,
          quantity: 5,
          status_id: 1,
          product_id: 9,
          paying_price: 40.93,
          product_variation_id: 27
        },
        {
          order_id: 3,
          quantity: 1,
          status_id: 1,
          product_id: 4,
          paying_price: 22.75,
          product_variation_id: 10
        },
        {
          order_id: 3,
          quantity: 1,
          status_id: 1,
          product_id: 6,
          paying_price: 20.91,
          product_variation_id: 16
        },
        {
          order_id: 3,
          quantity: 1,
          status_id: 1,
          product_id: 2,
          paying_price: 27.70,
          product_variation_id: 4
        },
        {
          order_id: 4,
          quantity: 2,
          status_id: 1,
          product_id: 1,
          paying_price: 25.41,
          product_variation_id: 2
        },
        {
          order_id: 4,
          quantity: 1,
          status_id: 1,
          product_id: 12,
          paying_price: 37.56,
          product_variation_id: 36
        },
        {
          order_id: 5,
          quantity: 2,
          status_id: 1,
          product_id: 5,
          paying_price: 29.27,
          product_variation_id: 13
        },
        {
          order_id: 5,
          quantity: 2,
          status_id: 1,
          product_id: 11,
          paying_price: 29.25,
          product_variation_id: 32
        },
        {
          order_id: 6,
          quantity: 4,
          status_id: 1,
          product_id: 3,
          paying_price: 31.67,
          product_variation_id: 9
        },
        {
          order_id: 7,
          quantity: 1,
          status_id: 1,
          product_id: 10,
          paying_price: 43.60,
          product_variation_id: 30
        },
        {
          order_id: 7,
          quantity: 2,
          status_id: 1,
          product_id: 8,
          paying_price: 36.30,
          product_variation_id: 23
        },
        {
          order_id: 8,
          quantity: 1,
          status_id: 1,
          product_id: 1,
          paying_price: 18.40,
          product_variation_id: 1
        },
        {
          order_id: 8,
          quantity: 1,
          status_id: 1,
          product_id: 9,
          paying_price: 22.09,
          product_variation_id: 25
        },
        {
          order_id: 8,
          quantity: 2,
          status_id: 1,
          product_id: 2,
          paying_price: 27.70,
          product_variation_id: 4
        },
        {
          order_id: 9,
          quantity: 1,
          status_id: 1,
          product_id: 7,
          paying_price: 28.23,
          product_variation_id: 19
        },
        {
          order_id: 9,
          quantity: 1,
          status_id: 1,
          product_id: 2,
          paying_price: 27.70,
          product_variation_id: 4
        },
        {
          order_id: 9,
          quantity: 1,
          status_id: 1,
          product_id: 6,
          paying_price: 20.91,
          product_variation_id: 16
        },
        {
          order_id: 9,
          quantity: 1,
          status_id: 1,
          product_id: 9,
          paying_price: 22.09,
          product_variation_id: 25
        },
        {
          order_id: 9,
          quantity: 2,
          status_id: 1,
          product_id: 12,
          paying_price: 37.56,
          product_variation_id: 36
        },
        {
          order_id: 10,
          quantity: 2,
          status_id: 1,
          product_id: 5,
          paying_price: 33.33,
          product_variation_id: 14
        },
        {
          order_id: 10,
          quantity: 1,
          status_id: 1,
          product_id: 5,
          paying_price: 40.41,
          product_variation_id: 15
        },
        {
          order_id: 11,
          quantity: 2,
          status_id: 1,
          product_id: 8,
          paying_price: 30.60,
          product_variation_id: 22
        },
        {
          order_id: 11,
          quantity: 2,
          status_id: 1,
          product_id: 9,
          paying_price: 40.93,
          product_variation_id: 27
        },
        {
          order_id: 11,
          quantity: 1,
          status_id: 1,
          product_id: 1,
          paying_price: 25.41,
          product_variation_id: 2
        },
        {
          order_id: 12,
          quantity: 1,
          status_id: 1,
          product_id: 7,
          paying_price: 44.31,
          product_variation_id: 21
        },
        {
          order_id: 12,
          quantity: 1,
          status_id: 1,
          product_id: 12,
          paying_price: 37.56,
          product_variation_id: 36
        },
        {
          order_id: 13,
          quantity: 2,
          status_id: 1,
          product_id: 11,
          paying_price: 44.24,
          product_variation_id: 33
        },
        {
          order_id: 14,
          quantity: 1,
          status_id: 1,
          product_id: 5,
          paying_price: 40.41,
          product_variation_id: 15
        },
        {
          order_id: 14,
          quantity: 1,
          status_id: 1,
          product_id: 7,
          paying_price: 28.23,
          product_variation_id: 19
        },
        {
          order_id: 15,
          quantity: 3,
          status_id: 1,
          product_id: 5,
          paying_price: 40.41,
          product_variation_id: 15
        },
        {
          order_id: 15,
          quantity: 1,
          status_id: 1,
          product_id: 7,
          paying_price: 36.68,
          product_variation_id: 20
        }
      ]);
    });
};