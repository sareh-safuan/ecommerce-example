
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: "Carlynne",
          last_name: "Antonchik",
          email: "cantonchik0@blogtalkradio.com",
          phone_number: "6001730216",
          hash: "PBxc37PDu",
          usergroup_id: 1
        }, {
          first_name: "Lucia",
          last_name: "Fance",
          email: "lfance1@plala.or.jp",
          phone_number: "5504567471",
          hash: "9sbgWw",
          usergroup_id: 1
        }, {
          first_name: "Mercie",
          last_name: "Ecclestone",
          email: "mecclestone2@xrea.com",
          phone_number: "3086152918",
          hash: "qrm1Mhn35h8U",
          usergroup_id: 1
        }, {
          first_name: "Rhodie",
          last_name: "Rudsdell",
          email: "rrudsdell3@howstuffworks.com",
          phone_number: "4205880492",
          hash: "civLPfOfyC",
          usergroup_id: 1
        }, {
          first_name: "Kath",
          last_name: "Domican",
          email: "kdomican4@jiathis.com",
          phone_number: "3721270092",
          hash: "ArcBIDa",
          usergroup_id: 1
        }, {
          first_name: "Jeana",
          last_name: "O'Shaughnessy",
          email: "joshaughnessy5@macromedia.com",
          phone_number: "3298334627",
          hash: "fDVjwN",
          usergroup_id: 1
        }, {
          first_name: "Augustin",
          last_name: "Duddell",
          email: "aduddell6@weebly.com",
          phone_number: "3681244074",
          hash: "Ah1YBdALDSKO",
          usergroup_id: 1
        }, {
          first_name: "Freda",
          last_name: "Mackney",
          email: "fmackney7@bravesites.com",
          phone_number: "9741962335",
          hash: "FHF4ffkmAVR",
          usergroup_id: 1
        }, {
          first_name: "Evelyn",
          last_name: "Whyborne",
          email: "ewhyborne8@pen.io",
          phone_number: "7109300032",
          hash: "Q0FLP8B7uyk2",
          usergroup_id: 1
        }, {
          first_name: "Mersey",
          last_name: "Simon",
          email: "msimon9@apple.com",
          phone_number: "8067320787",
          hash: "BASIoN",
          usergroup_id: 1
        }
      ]);
    });
};