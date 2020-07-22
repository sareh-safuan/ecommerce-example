const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const fs = require('fs')
const path = require('path')

const expect = chai.expect
const baseUrl = 'http://localhost:4000'
chai.use(chaiHttp)

const user = function () {
    const data = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        phone_number: faker.phone.phoneNumber(),
        password: faker.internet.password(),
        usergroup_id: 1
    }

    const missing = function () {
        for (let key in data) {
            const i = Math.floor(Math.random() * 2)
            if (i) {
                delete data[key]
            }
        }

        return data
    }

    const invalid = function () {
        for (let key in data) {
            const i = Math.floor(Math.random() * 2)
            if (i) {
                data[key] = ""
            }
        }

        return data
    }

    const ok = function () {
        data['password_confirmation'] = data.password
        return data
    }

    return {
        missing,
        invalid,
        ok
    }
}

describe.skip('Route /user/register: Method POST', function () {
    const route = '/user/register'

    it('Missing all or some required fields', function (done) {
        const data = user().missing()
        chai.request(baseUrl)
            .post(route)
            .type('json')
            .send(data)
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                done()
            })
            .catch(function (err) {
                throw err
            })

    })

    it('All or some required fields not meet requirement', function (done) {
        const data = user().invalid()
        chai.request(baseUrl)
            .post(route)
            .send(data)
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                done()
            })
            .catch(function (err) {
                throw err
            })
    })

    it('Email already registered', function (done) {
        chai.request(baseUrl)
            .post(route)
            .send({
                first_name: "Carlynne",
                last_name: "Antonchik",
                email: "cantonchik0@blogtalkradio.com",
                phone_number: "6001730216",
                password: 'mysecretpassword',
                password_confirmation: 'mysecretpassword',
                usergroup_id: 1
            })
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                done()
            })
            .catch(function (err) {
                throw err
            })
    })

    it('Success registration', function (done) {
        const data = user().ok()
        chai.request(baseUrl)
            .post(route)
            .type('json')
            .send(data)
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(201)
                expect(res.body['success']).to.equal(1)
                expect(res.body['msg']).to.equal('User registered.')
                done()
            })
            .catch(function (err) {
                throw err
            })
    })
})

describe.skip('Route /user/login: Method POST', function () {
    const route = '/user/login'

    it('Missing email or password or both', function (done) {
        const email = 'ali@email.com'
        const password = 'mysecretpassword'
        const firstData = { email }
        const secondData = { password }
        const thirdData = {}
        const random = Math.floor(Math.random() * 3)
        let data

        switch (random) {
            case 1:
                data = firstData
                break
            case 2:
                data = secondData
                break
            default:
                data = thirdData
                break
        }

        chai
            .request(baseUrl)
            .post(route)
            .send(data)
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                done()
            })
            .catch(function (err) {
                throw err
            })
    })

    it('Unregistered email', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .send({
                email: 'unregistered@email.com',
                password: 'mysecretpassword'
            })
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(404)
                expect(res.body['success']).to.equal(0)
                expect(res.body['msg']).to.equal('Email not found.')
                done()
            })
            .catch(function (err) {
                throw err
            })
    })

    it('Wrong password', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .send({
                email: 'ali@email.com',
                password: 'thewrongpassword'
            })
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                expect(res.body['msg']).to.equal('Wrong password.')
                done()
            })
            .catch(function (err) {
                throw err
            })
    })

    it('Success login', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .send({
                email: 'ali@email.com',
                password: 'secret123'
            })
            .then(function (res) {
                expect(res).to.be.json
                expect(res).to.have.status(200)
                expect(res).to.have.cookie('premium-fruit')
                expect(res.body['success']).to.equal(1)
                expect(res.body['msg']).to.equal('Login success.')
                expect(res.body['data']).to.have.own.property('id')
                done()
            })
    })
})

describe.skip('Route /product/create: Method POST', function () {
    const route = '/product/create'

    /**
     * 1) image is not uploaded -DONE
     * 2) missing all product informations -DONE
     * 3) missing partial product informations - KIV
     * 4) success product creation -DONE
     */

    it('Missing product image', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .type('form')
            .field('product_name', 'Apple')
            .field('description', faker.hacker.phrase())
            .then((res) => {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                expect(res.body['msg']).to.equal('Please upload product image.')
                done()
            })
            .catch(err => {
                throw err
            })
    })

    it('Missing product information', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .type('form')
            .attach(
                'image',
                fs.readFileSync(path.join(__dirname, '1.jpeg')),
                '1.jpeg'
            )
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                done()
            })
            .catch(err => {
                throw err
            })
    })

    it('Success product creation', function (done) {
        chai
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
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(201)
                expect(res.body['success']).to.equal(1)
                expect(res.body['msg']).to.equal('Product created.')
                done()
            })
            .catch(err => {
                throw err
            })
    })
})

describe.skip('Route /product/create-variation: Method POST', function () {
    const route = '/product/create-variation'

    /**
     * 1) Missing all required field
     * 2) Missing some required field
     * 3) Some required field not meet requirement - KIV
     * 4) Success create
     */

    it('Missing all required fields', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .send({})
            .then((res) => {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                done()
            })
            .catch(err => {
                throw err
            })
    })

    it('Missing some required fields', function (done) {
        chai
            .request(baseUrl)
            .post(route)
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
            .then((res) => {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                done()
            })
            .catch(err => {
                throw err
            })
    })

    it('Success product variations creation', function (done) {
        chai
            .request(baseUrl)
            .post(route)
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
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(201)
                expect(res.body['success']).to.equal(1)
                expect(res.body['msg']).to.equal('Product variations added.')
                done()
            })
            .catch(err => {
                throw err
            })
    })
})

describe.skip('Route /product: Method GET', function () {
    const route = '/product'

    it('Sucess request', function (done) {
        chai
            .request(baseUrl)
            .get(route)
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(200)
                expect(res.body['success']).to.equal(1)
                expect(res.body['data']).to.be.an('array')
                expect(res.body['data']).not.to.be.empty
                done()
            })
            .catch(err => {
                throw err
            })
    })
})

describe.skip('Route /product/:id: Method GET', function () {
    const route = '/product/1'

    it('Success request', function (done) {
        chai
            .request(baseUrl)
            .get(route)
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(200)
                expect(res.body['success']).to.equal(1)
                expect(res.body['data']).to.have.all.keys([
                    'product_name', 'image', 'description', 'variations'
                ])
                expect(res.body['data']['variations']).to.be.an('array')
                done()
            })
            .catch(err => {
                throw err
            })
    })
})

describe.skip('Route /address/create: Method POST', function () {
    const route = '/address/create'

    /**
     * 1) Missing all required fields
     * 2) Missing some of required fields -KIV
     * 3) Success address added - address_two empty string 
     * 4) Success address added - address_two included
     */

    it('Missing all required', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .send({})
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                done()
            })
            .catch(err => {
                throw err
            })
    })

    it('Success address added - address_two empty string', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .send({
                user_id: 1,
                tag: 'Home Address #1',
                address_one: faker.fake('{{address.streetName}}, {{address.streetAddress}}'),
                address_two: '',
                city: faker.address.city(),
                postcode: faker.address.zipCode('#####'),
                state: faker.address.state()
            })
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(201)
                expect(res.body['success']).to.equal(1)
                expect(res.body['msg']).to.equal('Address added.')
                done()
            })
            .catch(err => {
                throw err
            })
    })

    it('Success address added - address_two included', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .send({
                user_id: 1,
                tag: 'Home Address #2',
                address_one: faker.fake('{{address.streetName}}, {{address.streetAddress}}'),
                address_two: faker.address.secondaryAddress,
                city: faker.address.city(),
                postcode: faker.address.zipCode('#####'),
                state: faker.address.state()
            })
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(201)
                expect(res.body['success']).to.equal(1)
                expect(res.body['msg']).to.equal('Address added.')
                done()
            })
            .catch(err => {
                throw err
            })
    })
})

describe.skip('Route /address/:userId: Method GET', function () {
    const route = '/address/1'

    it('Success request', function (done) {
        chai
            .request(baseUrl)
            .get(route)
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(200)
                expect(res.body['success']).to.equal(1)
                expect(res.body['data']).to.be.an('array')
                done()
            })
            .catch(err => {
                throw err
            })
    })
})

describe.skip('Route /order/create: Method POST', function () {
    const route = '/order/create'

    /**
     * 1) Missing all required fields
     * 2) Incomplete/requirements failed required fields - KIV
     * 3) Success order
     */

    it('Missing all required fields', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .send({})
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                done()
            })
            .catch(err => {
                throw err
            })
    })

    it('Incomplete/requirements failed for required field', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .send({
                user_id: 1,
                address_id: 1
            })
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(400)
                expect(res.body['success']).to.equal(0)
                done()
            })
            .catch(err => {
                throw err
            })
    })

    it('Success order', function (done) {
        chai
            .request(baseUrl)
            .post(route)
            .send({
                user_id: 1,
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
            .then(res => {
                expect(res).to.be.json
                expect(res).to.have.status(201)
                expect(res.body['success']).to.equal(1)
                expect(res.body['msg']).to.equal('Order is placed.')
                done()
            })
            .catch(err => {
                throw err
            })
    })
})