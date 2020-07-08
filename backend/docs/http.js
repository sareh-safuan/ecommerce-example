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
        route: ['@/change-password', 'PUT'],
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
                        price: 30,
                        image: 'apple.jpg'
                    },
                    {
                        id: 2,
                        product_name: 'Apricot',
                        slug: 'the-apricot',
                        price: 50,
                        image: 'apricot.jpg'
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
                    id: 1,
                    product_name: 'Apple',
                    slug: 'the-best-apple',
                    price: 30,
                    image: 'apple.jpg'
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
        route: ['@delete-variation/:id', 'delete'],
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