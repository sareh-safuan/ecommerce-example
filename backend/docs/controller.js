const UserController = [
    {
        fn: 'create',
        request: {
            body: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@dmmy.com',
                phone_number: 111122223333,
                password: 'mysecretpassword',
                password_confirmation: 'mysecretpassword',
                usergroup_id: 1
            }
        },
        response: {
            code: 201,
            data: {
                success: 1,
                msg: 'User registered'
            }
        }
    },
    {
        fn: 'profile',
        request: {
            param: {
                id: 10
            }
        },
        response: {
            code: 200,
            data: {
                success: 1,
                data: {
                    id: 10,
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'johndoe@dmmy.com',
                    phone_number: 11112222333,
                    avatar: 'myprofileimage.jpg'
                }
            }
        }
    },
    {
        fn: 'update',
        request: {
            param: {
                id: 10
            },
            body: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@dmmy.com',
                phone_number: 111122223333
            }
        },
        response: {
            code: 200,
            data: {
                success: 1,
                msg: 'User updated.'
            }
        }
    },   
    {
        fn: 'delete',
        request: {
            param: {
                id: 10
            },
            body: {
                id: 10
            }
        },
        response: {
            code: 200,
            success: 1,
            data: {
                success: 1,
                msg: 'Delete success'
            }
        }
    }
]

const AuthController = [
    {
        fn: 'login',
        request: {
            body: {
                email: 'johndoe@dmmy.com',
                password: 'mysecretpassword'
            }
        },
        response: {
            code: 200,
            data: {
                success: 1,
                msg: 'Login success.',
                data: {
                    id: 10,
                    email: 'johndoe@dmmy.com',
                    avatar: 'myprofileimage.jpg'
                }
            }
        }
    },
    {
        fn: 'changePassword',
        request: {
            param: {
                id: 10
            },
            body: {
                id: 10,
                currentPassword: 'mysecretpassword',
                newPassword: 'mynewsecretpassword',
                newPasswordConfirmation: 'mynewsecretpassword'
            }
        },
        response: {
            code: 200,
            data: {
                success: 1,
                msg: 'Password change.'
            }
        }
    }
]

const ProductController = [
    {
        fn: 'create',
        request: {
            body: {
                product_name: 'Apple',
                descripton: 'lorem...15',
                image: 'images.jpg|FILE'
            }
        },
        response: {
            code: 201,
            data: {
                success: 1,
                msg: 'Product created'
            }
        }
    },
    {
        fn: 'createVariation',
        request: {
            body: {
                product_variation: [
                    {
                        product_id: 10,
                        variation_description: 'lorem...5',
                        price: 30,
                        quantity: 100,
                    },
                    {
                        product_id: 10,
                        variation_description: 'lorem...5',
                        price: 40,
                        quantity: 120,
                    },
                    {
                        product_id: 10,
                        variation_description: 'lorem...5',
                        price: 40,
                        quantity: 80,
                    }
                ]
            }
        },
        response: {
            code: 201,
            data: {
                success: 1,
                msg: 'Product variations added'
            }
        }
    },
    {
        fn: 'list',
        request: {},
        response: {
            code: 201,
            data: {
                success: 1,
                data: [
                    {
                        id: 1,
                        product_name: 'Apple',
                        slug: 'the-best-apple',
                        image: 'apple.jpg',
                        description: 'lorem...15',
                        price: 30
                    },
                    {
                        id: 2,
                        product_name: 'Apricot',
                        slug: 'the-apricot',
                        image: 'apricot.jpg',
                        description: 'lorem...15',
                        price: 50
                    },
                    {
                        // Many more...
                    }
                ]
            }
        }
    },
    {
        fn: 'detail',
        request: {
            param: {
                id: 10
            }
        },
        response: {
            code: 200,
            data: {
                success: 1,
                data: {
                    product_name: 'Apple',
                    image: 'apple.jpg',
                    description: 'lorem...15',
                    variations: [
                        {
                            id: 10,
                            price: 5.00,
                            variation_description: 'lorem...5',
                            quantity: 100
                        },
                        {
                            // more...
                        }
                    ]
                }
            }
        }
    },
    {
        fn: 'update',
        request: {
            param: {
                id: 10
            },
            body: {
                id: 10,
                product_name: 'The Apple',
                descripton: 'lorem...15',
                image: 'new_apple.jpg'
            }
        },
        response: {
            code: 201,
            data: {
                success: 1,
                msg: 'Product updated.',
                data: {
                    id: 10,
                    product_name: 'The Apple',
                    descripton: 'lorem...15',
                    image: 'new_apple.jpg'
                }
            }
        }
    },
    {
        fn: 'updateVariation',
        request: {
            param: {
                id: 20
            },
            body: {
                id: 20,
                variation_description: 'lorem...5',
                price: 14.5,
                quantity: 88
            }
        },
        response: {
            code: 200,
            data: {
                success: 1,
                msg: 'Product updated.',
                data: {
                    id: 20,
                    variation_description: 'lorem...5',
                    price: 14.5,
                    quantity: 88
                }
            }
        }
    },
    {
        fn: 'delete',
        request: { param: {}, body: {} },
        response: {
            code: 200,
            data: {
                success: 1
            }
        }
    },
    {
        fn: 'deleteVariation',
        request: { param: {}, body: {} },
        response: {
            code: 200,
            data: {
                success: 1
            }
        }
    }
]

const AddressController = [
    {
        fn: 'create',
        request: {
            body: {
                user_id: 10,
                tag: 'Home Address',
                address_one: 'No 101, Taman...',
                address_two: 'Optional field',
                city: 'Kuala Lumpur',
                postcode: '55000'
            }
        },
        response: {
            code: 201,
            data: {
                success: 1,
                msg: 'Address added.'
            }
        }
    },
    {
        fn: 'list',
        request: {
            param: {
                userId: 10
            }
        },
        response: {
            code: 200,
            data: {
                success: 1,
                data: [
                    {
                        id: 20,
                        tag: 'Home Address',
                        address_one: 'No 444, ...',
                        address_two: 'Optional field',
                        city: 'Kuantan',
                        postcode: 71000,
                        state: 'Pahang'
                    },
                    {
                        id: 21,
                        tag: 'Office Address',
                        address_one: '... continue more'
                    }
                ]
            }
        }
    },
    {
        // update address
    },
    {
        // delete address
    }
]

const OrderController = [
    {
        fn: 'create',
        request: {
            body: {
                user_id: 10,
                address_id: 10,
                total_price_paid: 55.00,
                orders: [
                    {
                        product_id: 11,
                        product_variation_id: 22,
                        paying_price: 14.10,
                        quantity: 2
                    },
                    {
                        // more orders...
                    }
                ]
            }
        },
        response: {
            code: 201,
            data: {
                success: 1,
                msg: 'Order is placed.'
            }
        }
    },
    {
        fn: 'list',
        request: {
            param: {
                id: 10
            }
        },
        response: {
            code: 200,
            data: {
                success: 1,
                data: {
                    id: 34,
                    created_at: new Date(),
                    products: [
                        {
                            img: 'Apple.jpg',
                            name: 'Apple (S)',
                            quantity: 4,
                            price: 17.10
                        },
                        {
                            // more products if available
                        }
                    ]
                }
            }
        }
    },
    {
        // update order
    }
]