
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: "John",
          last_name: "Doe",
          email: "john@email.com",
          phone_number: "6001730216",
          hash: "$2b$10$eR0ID9TsnK11Os9lJIPU0Oklz9v6enbSNSGK2lH24.xSxOSNM9wiO",
          usergroup_id: 1
        },
        {
          first_name: "Jane",
          last_name: "Doe",
          email: "jane@email.com",
          phone_number: "106432918",
          hash: "$2b$10$SqzZLnA.jed299dV74Abeeh2D34jPGwK5jFXQKghItzuh8R1LQ5MC",
          usergroup_id: 1
        },
        {
          first_name: "Jack",
          last_name: "Reach",
          email: "jack0@email.com",
          phone_number: "4205880492",
          hash: "$2b$10$IwQYH0vSZdm36smhnudHx.Bk7zeJnpwAex5c390RCxh7zXgIiKiji",
          usergroup_id: 1
        },
        {
          first_name: "Janet",
          last_name: "Jackso",
          email: "janet@email.com",
          phone_number: "3681294071",
          hash: "$2b$10$qhiWWMWQBgOwKZZ0Tgeb4e9aMZL5INAP5EpNpd2.5J3dgSRErHj1K",
          usergroup_id: 1
        },
        {
          first_name: "Ali",
          last_name: "Baba",
          email: "ali@email.com",
          phone_number: "5109301032",
          hash: "$2b$10$Q/nFyk0TFkdxxPJCrUA/2uF.CUU4JDLd2EqSHchMCP/m.4zFjkte2",
          usergroup_id: 1
        },
        {
          first_name: "Carlynne",
          last_name: "Antonchik",
          email: "cantonchik0@blogtalkradio.com",
          phone_number: "6001730216",
          hash: "$2b$10$XJTchjOJ9mX/kqFb8uIxl.MlGRSljPzpL3LSASBkUwyrIHIvZnvFK",
          usergroup_id: 1
        },
        {
          first_name: "Lucia",
          last_name: "Fance",
          email: "lfance1@plala.or.jp",
          phone_number: "5504567471",
          hash: "$2b$10$fOwpj6Vs6QMT1gb8bf31c.hys/OH6Z98Yu0phQj1QK2E0ED4fM0Ya",
          usergroup_id: 1
        },
        {
          first_name: "Mercie",
          last_name: "Ecclestone",
          email: "mecclestone2@xrea.com",
          phone_number: "3086152918",
          hash: "$2b$10$tu9Mx/mYPTGVdFUtHHLgROAxS2LKxQijdW.aPd8yrtqtbDh/MppZi",
          usergroup_id: 1
        },
        {
          first_name: "Rhodie",
          last_name: "Rudsdell",
          email: "rrudsdell3@howstuffworks.com",
          phone_number: "4205880492",
          hash: "$2b$10$dFzpfF1zb5faTNpytiDXv.t/3Ux8BaILZNKnOQ0fUK6k5trPvhRWW",
          usergroup_id: 1
        },
        {
          first_name: "Kath",
          last_name: "Domican",
          email: "kdomican4@jiathis.com",
          phone_number: "3721270092",
          hash: "$2b$10$19o3T6dUa.6gxuo377bZGeprcRX6iMDKWryBmv2LK40xVBAHL9zxS",
          usergroup_id: 1
        },
        {
          first_name: "Jeana",
          last_name: "O'Shaughnessy",
          email: "joshaughnessy5@macromedia.com",
          phone_number: "3298334627",
          hash: "$2b$10$qK2Qwt6xMuq/vCNLsawOCeSnuZn5PBajK7DB/p/UMq63jEkIy7sgS",
          usergroup_id: 1
        },
        {
          first_name: "Augustin",
          last_name: "Duddell",
          email: "aduddell6@weebly.com",
          phone_number: "3681244074",
          hash: "$2b$10$tqKmj4rtvy6ztDm5ZV9./..A950.Ih566yzdC.LylycL9Kpz.lyC2",
          usergroup_id: 1
        },
        {
          first_name: "Freda",
          last_name: "Mackney",
          email: "fmackney7@bravesites.com",
          phone_number: "9741962335",
          hash: "$2b$10$x.lWdXxS1IzAzXi4hbOEd.AMZV8q4z5OxABbSuDvLePl/MuB8tHgS",
          usergroup_id: 1
        },
        {
          first_name: "Evelyn",
          last_name: "Whyborne",
          email: "ewhyborne8@pen.io",
          phone_number: "7109300032",
          hash: "$2b$10$lPhklDrW8l6FXGSbwndOW.B5kEASYrS6JxnyX0Uj6m9dlZ/yLCNf2",
          usergroup_id: 1
        },
        {
          first_name: "Mersey",
          last_name: "Simon",
          email: "msimon9@apple.com",
          phone_number: "8067320787",
          hash: "$2b$10$bn34zkMqWPuNaVtfnBM/P.vX0k1Uxnkfj2RmzsG14Mc88m7t2kXGW",
          usergroup_id: 1
        }
      ]);
    });
};