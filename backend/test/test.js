const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const fs = require('fs')
const path = require('path')

const expect = chai.expect
const baseUrl = 'http://localhost:4000'
chai.use(chaiHttp)

const login = async function (_email, _password) {
    const email = _email || 'ali@email.com'
    const password = _password || 'secret123'

    const res = await chai
        .request(baseUrl)
        .post('/auth/login')
        .type('json')
        .send({
            email,
            password
        })

    return {
        cookie: res.header['set-cookie'],
        user: res.body.data
    }
}

/**
 * __________ Auth controller __________
 * 
 */
describe.skip('Route /auth/login => Method POST', function () {
    const route = '/auth/login'

    it('Missing all the required fields', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing email', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({
                password: 'secret123'
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing password', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({
                email: 'ali@email.com'
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Unregistered email', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({
                email: 'unregistered@email.com',
                password: 'mysecretpassword'
            })

        expect(res).to.be.json
        expect(res).to.have.status(404)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Email not found.')
    })

    it('Wrong password', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({
                email: 'ali@email.com',
                password: 'thewrongpassword'
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Wrong password.')
    })

    it('Success login', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({
                email: 'ali@email.com',
                password: 'secret123'
            })

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res).to.have.cookie('the-premium-fruit')
        expect(res.body['msg']).to.equal('Login success.')
        expect(res.body['data']).to.have.own.property('id')
    })
})

describe.skip('Route /auth/change-password/:id => Method PUT', function () {
    let cookie = ''
    let user = {}
    let route = '/auth/change-password/'

    before(async function () {
        const temp = await login()
        cookie = temp.cookie
        user = temp.user
    })

    it('Not sign in', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(401)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Please login before continue.')
    })

    it('Updating other user password', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + '1')
            .set('cookie', cookie)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(403)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Access is forbidden.')
    })

    it('Missing all required fields', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Password less than 8 characters', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                currentPassword: 'secret123',
                newPassword: 'secret',
                newPasswordConfirmation: 'secret'
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Current password is incorrect', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                currentPassword: 'notmypassword',
                newPassword: 'secretprolly',
                newPasswordConfirmation: 'secretprolly'
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('New password same as current password', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                currentPassword: 'secret123',
                newPassword: 'secret123',
                newPasswordConfirmation: 'secret123'
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Success password change', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                currentPassword: 'secret123',
                newPassword: 'newpassword',
                newPasswordConfirmation: 'newpassword'
            })

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body['success']).to.equal(1)
    })

    after(async function () {
        await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                currentPassword: 'newpassword',
                newPassword: 'secret123',
                newPasswordConfirmation: 'secret123'
            })
    })
})


/**
 * __________ User Route __________
 * 
 */
describe.skip('Route /user => Method GET', function () {
    const route = '/user'

    // not login, access control

    it('Success request', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route)

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
    })
})

describe.skip('Route /user => Method POST', function () {
    const route = '/user'
    const user = function (keys) {
        let data = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            phone_number: faker.phone.phoneNumber('###########'),
            password: faker.internet.password(),
            usergroup_id: 1
        }
        data['password_confirmation'] = data.password

        if (keys) {
            keys.forEach(function (key) {
                delete data[key]
            })
        }

        return data
    }

    it('Missing all the required field', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing first name', async function () {
        const data = user(['first_name'])
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send(data)

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing last name', async function () {
        const data = user(['last_name'])
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send(data)

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing password confirmation', async function () {
        const data = user(['password_confirmation'])
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send(data)

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    /**
     *  TODO: missing
     *  - email
     *  - phone number
     *  - password
     *  - usergroup id
     */

    it('Invalid email', async function () {
        let data = user()
        data.email = 'invalidemail.com'

        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send(data)

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Password less than 8 characters', async function () {
        let data = user()
        data.password = 'short'
        data.password_confirmation = 'short'

        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send(data)

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Password cofirmation not equal as password', async function () {
        let data = user()
        data.password_confirmation = 'somethingelse'

        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send(data)

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Email already registered', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({
                first_name: "Carlynne",
                last_name: "Antonchik",
                email: "ali@email.com",
                phone_number: "6001730216",
                password: 'mysecretpassword',
                password_confirmation: 'mysecretpassword',
                usergroup_id: 1
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Success registration', async function () {
        const data = user()
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send(data)

        expect(res).to.be.json
        expect(res).to.have.status(201)
        expect(res.body['success']).to.equal(1)
        expect(res.body['msg']).to.equal('User registered.')
    })
})

describe.skip('Route /user/:user => Method GET', function () {
    let cookie = ''
    let user = {}
    let route = '/user/'

    before(async function () {
        const temp = await login()
        cookie = temp.cookie
        user = temp.user
    })

    it.skip('Not sign in', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route + user.id)

        expect(res).to.be.json
        expect(res).to.have.status(401)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Please login before continue.')
    })

    it.skip('Trying access another user profile', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route + '1')
            .set('cookie', cookie)

        expect(res).to.be.json
        expect(res).to.have.status(403)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Access is forbidden.')
    })

    it('Success request', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route + user.id)

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
    })
})

describe.skip('Route /user/:user => Method PUT', function () {
    let cookie = ''
    let user = {}
    let route = '/user/'

    before(async function () {
        const temp = await login()
        cookie = temp.cookie
        user = temp.user
    })

    it('Not sign in', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(401)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Please login before continue.')
    })

    it('Updating another user profile', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + '1')
            .set('cookie', cookie)
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(403)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Access is forbidden.')
    })

    it('Missing all required field', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing first name', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                last_name: 'Takeuchi',
                email: 'ali@email.com',
                phone_number: '0111222333'
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing email', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                first_name: 'Ali',
                last_name: 'Takeuchi',
                phone_number: '0111222333'
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Invalid email', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                first_name: 'Ali',
                last_name: 'Tiger',
                email: 'ivalidemail.com',
                phone_number: '0111222333'
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    /**
     *  TODO:
     *  missing - last_name, phone_number
     *  invalid fields case
     */

    it('Email already registered to another user', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                first_name: 'Ali',
                last_name: 'Baba v2',
                email: 'cantonchik0@blogtalkradio.com',
                phone_number: '111122223333'
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Success updating the profile, using same email', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                first_name: 'Aliy',
                last_name: 'Baba v2',
                email: 'ali@email.com',
                phone_number: '0111222333'
            })

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body['success']).to.equal(1)
    })

    it('Success updating the profile, using new email', async function () {
        const res = await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                first_name: 'Aliy',
                last_name: 'Baba',
                email: 'ali2@email.com',
                phone_number: '0111222333'
            })

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body['success']).to.equal(1)
    })

    after(async function () {
        await chai
            .request(baseUrl)
            .put(route + user.id)
            .set('cookie', cookie)
            .type('json')
            .send({
                first_name: 'Ali',
                last_name: 'Baja',
                email: 'ali@email.com',
                phone_number: '0111222333'
            })
    })
})

describe.skip('Route /user/:user/address => Method: GET', function () {
    let cookie = ''
    let user = {}
    let route = '/user/'

    before(async function () {
        const temp = await login()
        cookie = temp.cookie
        user = temp.user
    })

    it('Success request', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route + user.id + '/address')

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
    })
})

describe.skip('Route /user/:user/order => Method: GET', function () {
    let cookie = ''
    let user = {}
    let route = '/user/'

    before(async function () {
        const temp = await login()
        cookie = temp.cookie
        user = temp.user
    })

    it('Success request', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route + user.id + '/order')

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
    })
})

describe.skip('Route /user/:user/order/:order => Method: GET', function () {
    let cookie = ''
    let user = {}
    let route = '/user/'

    before(async function () {
        const temp = await login()
        cookie = temp.cookie
        user = temp.user
    })

    it('Success request', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route + user.id + '/order/1')

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
    })
})


/**
 * __________ Adress controller __________
 * 
 */
describe.skip('Route /address => Method POST', function () {
    const route = '/address'
    let cookie = ''
    let user = {}
    const address = function (keys) {
        const data = {
            tag: 'Home Address #1',
            address_one: faker.fake('{{address.streetName}}, {{address.streetAddress}}'),
            address_two: '',
            city: faker.address.city(),
            postcode: faker.address.zipCode('#####'),
            state: faker.address.state()
        }

        if (keys) {
            keys.forEach(function (key) {
                delete data[key]
            })
        }

        return data
    }

    before(async function () {
        const temp = await login()
        cookie = temp.cookie
        user = temp.user
    })

    it('Not sign in', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(401)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing all required', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .set('cookie', cookie)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing first address', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .set('cookie', cookie)
            .type('json')
            .send({
                user_id: user.id,
                ...address(['address_one'])
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    /**
     *  TODO:
     *  - missing city, postcode, state
     */

    it('Success address added - address_two empty string', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .set('cookie', cookie)
            .type('json')
            .send({
                user_id: user.id,
                ...address()
            })

        expect(res).to.be.json
        expect(res).to.have.status(201)
        expect(res.body['success']).to.equal(1)
        expect(res.body['msg']).to.equal('Address added.')
    })

    it('Success address added - address_two included', async function () {
        const data = {
            user_id: user.id,
            ...address()
        }
        data.address_two = faker.address.secondaryAddress()

        const res = await chai
            .request(baseUrl)
            .post(route)
            .set('cookie', cookie)
            .type('json')
            .send(data)

        expect(res).to.be.json
        expect(res).to.have.status(201)
        expect(res.body['success']).to.equal(1)
        expect(res.body['msg']).to.equal('Address added.')
    })
})

describe.skip('Route /address/ =>  Method GET', function () {
    let cookie = ''
    let user = {}
    let route = '/address'

    before(async function () {
        const temp = await login()
        cookie = temp.cookie
        user = temp.user
    })

    it.skip('Not sign in', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route + user.id)

        expect(res).to.be.json
        expect(res).to.have.status(401)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Please login before continue.')
    })

    it.skip('Trying access other user address', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route + '1')
            .set('cookie', cookie)

        expect(res).to.be.json
        expect(res).to.have.status(403)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Access is forbidden.')
    })

    it('Success request', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route)

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
        expect(res.body['data']).to.be.an('array')
    })
})


/**
 * __________ Order controller __________
 * 
 */
describe.skip('Route /order => Method POST', function () {
    let cookie = ''
    let user = {}
    const route = '/order'

    before(async function () {
        const temp = await login()
        cookie = temp.cookie
        user = temp.user
    })

    it('Not sign in', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(401)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing all required fields', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .set('cookie', cookie)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing user id', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .set('cookie', cookie)
            .type('json')
            .send({
                address_id: 1,
                total_price_paid: 94.98,
                orders: [
                    {
                        product_id: 1,
                        product_variation_id: 41,
                        paying_price: 25.41,
                        quantity: 2
                    },
                    {
                        product_id: 2,
                        product_variation_id: 45,
                        paying_price: 44.16,
                        quantity: 1
                    }
                ]
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    /**
     *  TODO:
     *  missing address id, total price paid, orders
     */

    it('Success order', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .set('cookie', cookie)
            .type('json')
            .send({
                user_id: user.id,
                address_id: 1,
                total_price_paid: 94.98,
                orders: [
                    {
                        product_id: 1,
                        product_variation_id: 41,
                        paying_price: 25.41,
                        quantity: 2
                    },
                    {
                        product_id: 2,
                        product_variation_id: 45,
                        paying_price: 44.16,
                        quantity: 1
                    }
                ]
            })

        expect(res).to.be.json
        expect(res).to.have.status(201)
        expect(res.body['success']).to.equal(1)
        expect(res.body['msg']).to.equal('Order is placed.')
    })
})

describe.skip('Route /order => Method GET', function () {
    let route = '/order'

    it('Success reqest', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route)

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
    })
})

describe.skip('Route /order/:order => Method GET', function () {
    let cookie = ''
    let user = {}
    let route = '/order/1'

    before(async function () {
        const temp = await login()
        cookie = temp.cookie
        user = temp.user
    })

    it.skip('Not sign in', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route + user.id)

        expect(res).to.be.json
        expect(res).to.have.status(401)
        expect(res.body['success']).to.equal(0)
    })

    it.skip('Trying access other user order', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route + '1')
            .set('cookie', cookie)

        expect(res).to.be.json
        expect(res).to.have.status(403)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Access is forbidden.')
    })

    it('Success reqest', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route)

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
    })
})


/**
 * _________ Product routes __________ (KIV)
 * 
 */
describe.skip('Route /product => Method POST', function () {
    const route = '/product'

    /**
     *  - must login
     *  - admin only
     */

    it('Missing product image', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('form')
            .field('product_name', 'Apple')
            .field('description', faker.hacker.phrase())

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
        expect(res.body['msg']).to.equal('Please upload product image.')
    })

    it('Missing all product information fields', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('form')
            .attach(
                'image',
                fs.readFileSync(path.join(__dirname, '1.jpeg')),
                '1.jpeg'
            )

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    /**
     *  missing product name, description
     */

    it('Success product creation', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('form')
            .field('product_name', faker.commerce.color())
            .field('description', faker.hacker.phrase())
            .attach(
                'image',
                fs.readFileSync(path.join(__dirname, '1.jpeg')),
                '1.jpeg'
            )

        expect(res).to.be.json
        expect(res).to.have.status(201)
        expect(res.body['success']).to.equal(1)
        expect(res.body['msg']).to.equal('Product created.')
    })
})

describe.skip('Route /product/variation => Method POST', function () {
    const route = '/product/variation'

    /**
     *  - must login
     *  - admin only
     */

    it('Missing all required fields', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({})

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    it('Missing quantity', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({
                product_variation: [
                    {
                        product_id: 10,
                        variation_description: 'lorem...5',
                        price: 30,
                        quantity: 100
                    },
                    {
                        product_id: 10,
                        variation_description: 'lorem...5',
                        quantity: 100
                    }
                ]
            })

        expect(res).to.be.json
        expect(res).to.have.status(400)
        expect(res.body['success']).to.equal(0)
    })

    /**
     *  missing product_id, v_description, price
     */

    it('Success product variations creation', async function () {
        const res = await chai
            .request(baseUrl)
            .post(route)
            .type('json')
            .send({
                product_variation: [
                    {
                        product_id: 15,
                        variation_description: faker.commerce.color(),
                        price: 30,
                        quantity: 100,
                    },
                    {
                        product_id: 15,
                        variation_description: faker.commerce.color(),
                        price: 40,
                        quantity: 120,
                    },
                    {
                        product_id: 15,
                        variation_description: faker.commerce.color(),
                        price: 40,
                        quantity: 80,
                    }
                ]
            })

        expect(res).to.be.json
        expect(res).to.have.status(201)
        expect(res.body['success']).to.equal(1)
        expect(res.body['msg']).to.equal('Product variations added.')
    })
})

describe.skip('Route /product => Method GET', function () {
    const route = '/product'

    it('Sucess request', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route)

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body['data']).to.be.an('array')
        expect(res.body['data']).not.to.be.empty
    })
})

describe.skip('Route /product/:product => Method GET', function () {
    const route = '/product/1'

    it('Success request', async function () {
        const res = await chai
            .request(baseUrl)
            .get(route)

        expect(res).to.be.json
        expect(res).to.have.status(200)
        expect(res.body['data']).to.be.an('array')
        expect(res.body['data']).not.to.be.empty
    })
})