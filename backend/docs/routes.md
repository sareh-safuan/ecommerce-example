|   Access  |         URL                          |     Handler                 | Method |
|-----------|--------------------------------------|-----------------------------|--------|       
| admin     | /user                                | User.index                  | GET    | done
| public    | /user                                | User.create                 | POST   | done
|           | /user/:user                          | User.show                   | GET    | done
|           | /user/:user/profile                  | User.update                 | PUT    | done
|           | /user/:user/password                 | User.update                 | PUT    | done
|           | /user/:user                          | User.destroy                | DELETE | kiv
|           | /user/:user/address                  | Address.index               | GET    | done
|           | /user/:user/address                  | Address.create              | POST   | done
|           | /user/:user/address/:address         | Address.update              | PUT    | done
|           | /user/:user/address/:address         | Address.destroy             | DELETE | kiv
|           | /user/:user/order                    | Order.index                 | GET    | done
|           | /user/:user/order                    | Order.create                | POST   | done
|           | /user/:user/order/:order             | Order.show                  | GET    | done
|           | /user/:user/order/:order             | OrderDetail.update          | PUT    | KIV
|           |                                      |                             |        |        
|           | /auth/login                          | Auth.login                  | POST   | done
|           | /auth/logout                         | Auth.logout                 | GET    | kiv
|           |                                      |                             |        |
| admin     | /address                             | Address.index               | GET    | done
|           | /address/:address                    | Address.show                | GET    | done
|           |                                      |                             |        |
|           | /order                               | Order.index                 | GET    | done
|           | /order/:order                        | OrderDetail.index           | GET    | done
|           | /order/:order                        | OrderDetail.update          | PUT    | kiv
|           |                                      |                             |        | 
| public    | /product                             | Product.index               | GET    | done
|           | /product/:product                    | Product.show                | GET    | done
| admin     | /product                             | Product.create              | POST   | done
|           | /product/:product                    | ProductVariant.create       | POST   | done
|           | /product/:product/image              | Product.update              | PUT    | kiv
|           | /product/:product/info               | Product.update              | PUT    | kiv
|           | /product/:product/variant/:variant   | ProductVariant.update       | PUT    | kiv
|           | /product/:product                    | Product.destroy             | DELETE | kiv
|           | /product/:product/variant/:variant   | ProductVariant.destroy      | DELETE | kiv
|           |                                      |                             |        |