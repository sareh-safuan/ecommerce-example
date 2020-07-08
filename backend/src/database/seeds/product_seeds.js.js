
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([{
        product_name: "Apple",
        slug: "the-apple",
        description: "odio consequat varius integer ac leo pellentesque ultrices mattis odio donec",
        image: "apple.jpg"
      }, {
        product_name: "Apricot",
        slug: "an-apricot",
        description: "pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea",
        image: "apricot.jpg"
      }, {
        product_name: "Banana",
        slug: "nana-banana",
        description: "pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac",
        image: "banana.jpg"
      }, {
        product_name: "Guava",
        slug: "a-guava",
        description: "at feugiat non pretium quis lectus suspendisse potenti in eleifend quam",
        image: "guava.jpg"
      }, {
        product_name: "Honeydew",
        slug: "honey-dew",
        description: "ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean",
        image: "honeydew.jpg"
      }, {
        product_name: "Kiwi",
        slug: "Kiwi",
        description: "duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac",
        image: "kiwi.jpg"
      }, {
        product_name: "Lemon",
        slug: "le-lemon",
        description: "convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
        image: "lemon.jpg"
      }, {
        product_name: "Mango",
        slug: "mem-mango",
        description: "sagittis dui vel nisl duis ac nibh fusce lacus purus",
        image: "mango.jpg"
      }, {
        product_name: "Orange",
        slug: "y-orange",
        description: "metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in",
        image: "orange.jpg"
      }, {
        product_name: "Papaya",
        slug: "papapapa-paya",
        description: "primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti",
        image: "papaya.jpg"
      }, {
        product_name: "Pineapple",
        slug: "the-pineapple",
        description: "leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue",
        image: "pineapple.jpg"
      }, {
        product_name: "Strawberry",
        slug: "berry-the-strawberry",
        description: "elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae",
        image: "strawberry.jpg"
      }]);
    });
};

// const t = [{
//   product_name: "Apple",
//   slug: "the-apple",
//   description: "odio consequat varius integer ac leo pellentesque ultrices mattis odio donec",
//   image: "apple.jpg"
// }, {
//   product_name: "Apricot",
//   slug: "an-apricot",
//   description: "pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea",
//   image: "apricot.jpg"
// }, {
//   product_name: "Banana",
//   slug: "nana-banana",
//   description: "pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac",
//   image: "banana.jpg"
// }, {
//   product_name: "Guava",
//   slug: "a-guava",
//   description: "at feugiat non pretium quis lectus suspendisse potenti in eleifend quam",
//   image: "guava.jpg"
// }, {
//   product_name: "Honeydew",
//   slug: "honey-dew",
//   description: "ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean",
//   image: "honeydew.jpg"
// }, {
//   product_name: "Kiwi",
//   slug: "Kiwi",
//   description: "duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac",
//   image: "kiwi.jpg"
// }, {
//   product_name: "Lemon",
//   slug: "le-lemon",
//   description: "convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
//   image: "lemon.jpg"
// }, {
//   product_name: "Mango",
//   slug: "mem-mango",
//   description: "sagittis dui vel nisl duis ac nibh fusce lacus purus",
//   image: "mango.jpg"
// }, {
//   product_name: "Orange",
//   slug: "y-orange",
//   description: "metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in",
//   image: "orange.jpg"
// }, {
//   product_name: "Papaya",
//   slug: "papapapa-paya",
//   description: "primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti",
//   image: "papaya.jpg"
// }, {
//   product_name: "Pineapple",
//   slug: "the-pineapple",
//   description: "leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue",
//   image: "pineapple.jpg"
// }, {
//   product_name: "Strawberry",
//   slug: "berry-the-strawberry",
//   description: "elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae",
//   image: "strawberry.jpg"
// }]
