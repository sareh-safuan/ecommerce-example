const UserController = [
    {
        route: ['@/register', 'POST'],
        fn: 'register',
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
        route: ['@/login', 'POST'],
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
        route: ['@/:id', 'GET'],
        fn: 'fetch',
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
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'johndoe@dmmy.com',
                    phoneNumber: 11112222333,
                    avatar: 'myprofileimage.jpg',
                    usergroup: 'customer'
                }
            }
        }
    },
    {
        route: ['@/update-profile/:id', 'PUT'],
        fn: 'update',
        request: {
            param: {
                id: 10
            },
            body: {
                id: 10,
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@dmmy.com',
                phoneNumber: 111122223333,
                avatar: 'myprofileimage.jpg',
                usergroupId: 1
            }
        },
        response: {
            code: 201,
            data: {
                success: 1,
                msg: 'User updated.'
            }
        }
    },
    {
        route: ['@/change-password/:id', 'PUT'],
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
            code: 201,
            data: {
                success: 1,
                msg: 'Password change.'
            }
        }
    },
    {
        route: ['@/delete-account/:id', 'DELETE'],
        fn: 'deleteAccount',
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

const ProductController = [
    {
        route: ['@/create', 'POST'],
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
        route: ['@/create-variation', 'POST'],
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
        route: ['@/', 'GET'],
        fn: 'fetch',
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
        route: ['@/:id', 'GET'],
        fn: 'fetchOne',
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
        route: ['@/update/:id', 'PUT'],
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
        route: ['@/update-variation/:id', 'PUT'],
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
        route: ['@/delete/:id', 'delete'],
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
        route: ['@delete-variation/:product-id', 'delete'],
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
        route: ['@/create', 'POST'],
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
        route: ['@/:userId', 'GET'],
        fn: 'fetch',
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
        route: ['@/create', 'POST'],
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
        route: ['@/:id', 'GET'],
        fn: 'fetch',
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
        // cancelled order
    }
]