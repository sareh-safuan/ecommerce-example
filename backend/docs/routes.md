|   Access  |         URL                          |     Handler                 | Method |
|-----------|--------------------------------------|-----------------------------|--------|       
| admin     | /user                                | User.index                  | GET    |
| public    | /user                                | User.create                 | POST   |
|           | /user/:user                          | User.show                   | GET    |
|           | /user/:user/profile                  | User.update                 | PUT    |
|           | /user/:user/password                 | User.update                 | PUT    |
|           | /user/:user                          | User.destroy                | DELETE |
|           | /user/:user/address                  | Address.index               | GET    |
|           | /user/:user/address                  | Address.create              | POST   |
|           | /user/:user/address/:address         | Address.update              | PUT    |
|           | /user/:user/address/:address         | Address.destroy             | DELETE |
|           | /user/:user/order                    | Order.index                 | GET    |
|           | /user/:user/order                    | Order.create                | POST   |
|           | /user/:user/order/:order             | OrderDetail.index           | GET    |
|           | /user/:user/order/:order             | OrderDetail.update          | PUT    |
|           |                                      |                             |        |        
|           | /auth/login                          | Auth.login                  | POST   |
|           | /auth/logout                         | Auth.logout                 | GET    |
|           |                                      |                             |        |
| admin     | /address                             | Address.index               | GET    |
|           |                                      |                             |        |
|           | /order                               | Order.index                 | GET    |
|           | /order/:order                        | OrderDetail.index           | GET    |
|           | /order/:order                        | OrderDetail.update          | PUT    |
|           |                                      |                             |        | 
| public    | /product                             | Product.index               | GET    |
|           | /product/:product                    | ProductVariation.detail     | GET    |
| admin     | /product                             | Product.create              | POST   |
|           | /product/:product                    | Product.update              | PUT    |
|           | /product/:product/pv/:pv             | ProductVariation.update     | PUT    |
|           | /product/:product                    | Product.destroy             | DELETE |
|           |                                      |                             |        |