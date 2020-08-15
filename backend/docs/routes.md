|   Access  |         URL                          |     Handler                 | Method |
|-----------|----------------------                |-----------------------------|--------|       
| Public    | /user/:id                            | User.profile                | GET    |
|           | /user?                               | User.create                 | POST   |
|           | /user/:id                            | User.update                 | PUT    |
|           | /change-password/:id                 | User.update                 | PUT    |
|           | /user/:id                            | User.destroy                | DELETE |
|           |                                      |                             |        |        
|           | /auth/login                          | Auth.login                  | POST   |
|           | /auth/logout                         | Auth.logout                 | GET    |
|           |                                      |                             |        |
|           | /address?                            | Address.list                | GET    |
|           | /address                             | Address.create              | POST   |
|           | /address/:id (KIV)                   | Address.update              | PUT    |
|           | /address/:id (KIV)                   | Address.destroy             | DELETE |
|           |                                      |                             |        |
|           | /order?                              | Order.index                 | GET    |
|           | /order                               | Order.create                | POST   |
|           | /order/:id? (KIV)                    | Order.update                | PUT    |
|           |                                      |                             |        |
|           | /order-detail/:id (KIV)              | OrderDetail.update          | PUT    |
|           |                                      |                             |        | 
|           | /product?                            | Product.index               | GET    |
|           | /product/:id                         | Product.detail              | GET    |
|           |                                      |                             |        |
| Admin     | /ad/user?                            | User.find                   | GET    |
|           | /ad/user/:id (KIV)                   | User.destroy                | DELETE |
|           |                                      |                             |        |
|           | /ad/order?                           | Order.list                  | GET    |
|           |                                      |                             |        |
|           | /ad/order-detail? (KIV)              | Order.list                  | GET    |
|           | /ad/order-detail/:id (KIV)           | Order.update                | PUT    |
|           |                                      |                             |        |
|           | /ad/product?                         | Product.list                | GET    |
|           | /ad/product                          | Product.create              | POST   |
|           | /ad/product/:id (KIV)                | Product.update              | PUT    |
|           | /ad/product/:id (KIV)                | Product.destroy             | DELETE |
|           |                                      |                             |        |
|           | /ad/product-variation                | ProductVariation.list       | GET    |
|           | /ad/product-variation/:id            | ProductVariation.show       | GET    |
|           | /ad/product-variation/               | ProductVariation.create     | POST   |
|           | /ad/product-variation/:id (KIV)      | ProductVariation.update     | PUT    |
|           | /ad/product-variation/:id (KIV)      | ProductVariation.destroy    | DELETE |