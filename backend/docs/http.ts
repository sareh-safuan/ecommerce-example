const UserController = [
    {
        route: ['@/register', 'POST'],
        fn: 'register',
        request: {
            body: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@dmmy.com',
                phoneNumber: 111122223333,
                password: 'mysecretpassword',
                avatar: 'myprofileimage.jpg',
                usergroupId: 1
            }
        },
        response: {
            code: 201,
            data: {
                success: 1,
                data: {
                    msg: 'User registered'
                }
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
                data: {
                    msg: 'User updated'
                }
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
                data: {
                    msg: 'Password change'
                }
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
            success: 1,
            data: {
                success: 1,
                data: {
                    msg: 'Delete success'
                }
            }
        }
    }
]