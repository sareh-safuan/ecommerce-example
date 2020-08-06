
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('productvariations').del()
    .then(function () {
      // Inserts seed entries
      return knex('productvariations').insert([
        {
          "product_id": 1,
          "variation_description": "Small Pack",
          "price": "18.40",
          "quantity": 78
        }, {
          "product_id": 1,
          "variation_description": "Medium Pack",
          "price": "25.41",
          "quantity": 41
        }, {
          "product_id": 1,
          "variation_description": "Large Pack",
          "price": "37.62",
          "quantity": 54
        }, {
          "product_id": 2,
          "variation_description": "Small Pack",
          "price": "27.70",
          "quantity": 38
        }, {
          "product_id": 2,
          "variation_description": "Medium Pack",
          "price": "38.28",
          "quantity": 22
        }, {
          "product_id": 2,
          "variation_description": "Large Pack",
          "price": "44.16",
          "quantity": 72
        }, {
          "product_id": 3,
          "variation_description": "Small Pack",
          "price": "17.67",
          "quantity": 31
        }, {
          "product_id": 3,
          "variation_description": "Medium Pack",
          "price": "21.71",
          "quantity": 49
        }, {
          "product_id": 3,
          "variation_description": "Large Pack",
          "price": "31.67",
          "quantity": 71
        }, {
          "product_id": 4,
          "variation_description": "Small Pack",
          "price": "22.75",
          "quantity": 55
        }, {
          "product_id": 4,
          "variation_description": "Medium Pack",
          "price": "34.47",
          "quantity": 71
        }, {
          "product_id": 4,
          "variation_description": "Large Pack",
          "price": "43.80",
          "quantity": 71
        }, {
          "product_id": 5,
          "variation_description": "Small Pack",
          "price": "29.27",
          "quantity": 22
        }, {
          "product_id": 5,
          "variation_description": "Medium Pack",
          "price": "33.33",
          "quantity": 63
        }, {
          "product_id": 5,
          "variation_description": "Large Pack",
          "price": "40.41",
          "quantity": 55
        }, {
          "product_id": 6,
          "variation_description": "Small Pack",
          "price": "20.91",
          "quantity": 23
        }, {
          "product_id": 6,
          "variation_description": "Medium Pack",
          "price": "30.39",
          "quantity": 78
        }, {
          "product_id": 6,
          "variation_description": "Large Pack",
          "price": "34.52",
          "quantity": 50
        }, {
          "product_id": 7,
          "variation_description": "Small Pack",
          "price": "28.23",
          "quantity": 44
        }, {
          "product_id": 7,
          "variation_description": "Medium Pack",
          "price": "36.68",
          "quantity": 42
        }, {
          "product_id": 7,
          "variation_description": "Large Pack",
          "price": "44.31",
          "quantity": 73
        }, {
          "product_id": 8,
          "variation_description": "Small Pack",
          "price": "30.60",
          "quantity": 26
        }, {
          "product_id": 8,
          "variation_description": "Medium Pack",
          "price": "36.30",
          "quantity": 60
        }, {
          "product_id": 8,
          "variation_description": "Large Pack",
          "price": "43.32",
          "quantity": 33
        }, {
          "product_id": 9,
          "variation_description": "Small Pack",
          "price": "22.09",
          "quantity": 57
        }, {
          "product_id": 9,
          "variation_description": "Medium Pack",
          "price": "32.76",
          "quantity": 69
        }, {
          "product_id": 9,
          "variation_description": "Large Pack",
          "price": "40.93",
          "quantity": 27
        }, {
          "product_id": 10,
          "variation_description": "Small Pack",
          "price": "21.12",
          "quantity": 58
        }, {
          "product_id": 10,
          "variation_description": "Medium Pack",
          "price": "31.25",
          "quantity": 51
        }, {
          "product_id": 10,
          "variation_description": "Large Pack",
          "price": "43.60",
          "quantity": 35
        }, {
          "product_id": 11,
          "variation_description": "Small Pack",
          "price": "18.32",
          "quantity": 50
        }, {
          "product_id": 11,
          "variation_description": "Medium Pack",
          "price": "29.25",
          "quantity": 74
        }, {
          "product_id": 11,
          "variation_description": "Large Pack",
          "price": "44.24",
          "quantity": 45
        }, {
          "product_id": 12,
          "variation_description": "Small Pack",
          "price": "23.24",
          "quantity": 62
        }, {
          "product_id": 12,
          "variation_description": "Medium Pack",
          "price": "29.96",
          "quantity": 67
        }, {
          "product_id": 12,
          "variation_description": "Large Pack",
          "price": "37.56",
          "quantity": 72
        }]);
    });
};