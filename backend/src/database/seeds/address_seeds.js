
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('addresses').del()
    .then(function () {
      // Inserts seed entries
      return knex('addresses').insert([
        {
          user_id: 8,
          tag: "My Home",
          address_one: "76911 Rockefeller Drive",
          address_two: "Dottie Junction",
          city: "Chicago",
          postcode: 54510,
          state: "Louisiana"
        }, {
          user_id: 7,
          tag: "Home",
          address_one: "7716 Debra Crossing",
          address_two: "Beilfuss Pass",
          city: "Woerden",
          postcode: 41122,
          state: "Minnesota"
        }, {
          user_id: 1,
          tag: "rent house",
          address_one: "20648 Cascade Place",
          address_two: "Bonner Hill",
          city: "Jatinagara",
          postcode: 13662,
          state: "New York"
        }, {
          user_id: 5,
          tag: "Office",
          address_one: "85 Ohio Hill",
          address_two: "Blue Bill Park Crossing",
          city: "Konobeyevo",
          postcode: 17886,
          state: "Florida"
        }, {
          user_id: 11,
          tag: "mom home",
          address_one: "45763 Valley Edge Park",
          address_two: "Pleasure Trail",
          city: "Ozëry",
          postcode: 39134,
          state: "Texas"
        }, {
          user_id: 9,
          tag: "office",
          address_one: "1 Spohn Hill",
          address_two: "Del Mar Parkway",
          city: "Buritama",
          postcode: 43942,
          state: "Texas"
        }, {
          user_id: 13,
          tag: "my home",
          address_one: "1060 Shoshone Avenue",
          address_two: "Center Place",
          city: "Vylkove",
          postcode: 53685,
          state: "Virginia"
        }, {
          user_id: 8,
          tag: "My Sweet Home",
          address_one: "8 Logan Pass",
          address_two: "Pond Way",
          city: "Tours",
          postcode: 51862,
          state: "Iowa"
        }, {
          user_id: 3,
          tag: "dad house",
          address_one: "1 Ridge Oak Place",
          address_two: "Rowland Circle",
          city: "Kota Bharu",
          postcode: 27714,
          state: "Nevada"
        }, {
          user_id: 8,
          tag: "Sis",
          address_one: "6 Crest Line Point",
          address_two: "Anhalt Road",
          city: "Xarag",
          postcode: 31790,
          state: "Florida"
        }, {
          user_id: 14,
          tag: "Rent house",
          address_one: "01148 East Court",
          address_two: "Monument Pass",
          city: "Xiasi",
          postcode: 48800,
          state: "Louisiana"
        }, {
          user_id: 4,
          tag: "My home",
          address_one: "6 Butternut Parkway",
          address_two: "Lien Parkway",
          city: "Puerto Parra",
          postcode: 42767,
          state: "District of Columbia"
        }, {
          user_id: 3,
          tag: "Parent",
          address_one: "9 Lakewood Gardens Avenue",
          address_two: "",
          city: "Causip",
          postcode: 50555,
          state: "Florida"
        }, {
          user_id: 2,
          tag: "Parent",
          address_one: "5 Westridge Center",
          address_two: "Manitowish Circle",
          city: "The Valley",
          postcode: 29645,
          state: "Massachusetts"
        }, {
          user_id: 7,
          tag: "My 2nd Home",
          address_one: "8102 Troy Crossing",
          address_two: "",
          city: "Piteå",
          postcode: 16345,
          state: "California"
        }, {
          user_id: 13,
          tag: "office",
          address_one: "191 Mayfield Junction",
          address_two: "Becker Court",
          city: "Sydney",
          postcode: 28114,
          state: "Arizona"
        }, {
          user_id: 12,
          tag: "Rent",
          address_one: "436 Logan Lane",
          address_two: "Crest Line Junction",
          city: "Panawuan",
          postcode: 51570,
          state: "Illinois"
        }, {
          user_id: 13,
          tag: "Secret",
          address_one: "64 Kropf Circle",
          address_two: "Lawn Place",
          city: "Yanhe",
          postcode: 10174,
          state: "Kansas"
        }, {
          user_id: 9,
          tag: "My home",
          address_one: "90 Kennedy Point",
          address_two: "",
          city: "Tabuk",
          postcode: 12026,
          state: "Ohio"
        }, {
          user_id: 10,
          tag: "Latest",
          address_one: "31919 Larry Lane",
          address_two: "Lukken Hill",
          city: "Pogonsili",
          postcode: 16780,
          state: "North Carolina"
        }, {
          user_id: 13,
          tag: "Mine",
          address_one: "04 Warner Park",
          address_two: "Alpine Center",
          city: "Colatina",
          postcode: 16495,
          state: "Oregon"
        }, {
          user_id: 14,
          tag: "home",
          address_one: "083 Derek Circle",
          address_two: "Manitowish Circle",
          city: "Carvalheira",
          postcode: 11484,
          state: "New York"
        }, {
          user_id: 3,
          tag: "School",
          address_one: "37844 Hollow Ridge Drive",
          address_two: "",
          city: "Las Palmas",
          postcode: 52152,
          state: "Oregon"
        }, {
          user_id: 10,
          tag: "Latest",
          address_one: "309 Darwin Street",
          address_two: "56 Ryan Circle",
          city: "Gaolong",
          postcode: 10452,
          state: "Tennessee"
        }, {
          user_id: 1,
          tag: "Office",
          address_one: "57 Lyons Parkway",
          address_two: "",
          city: "Zharkent",
          postcode: 17297,
          state: "Oklahoma"
        }
      ]);
    });
};