const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')

const expect = chai.expect
const baseUrl = 'http://localhost:3000'
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

describe('Route /user/register: Method POST', function () {

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

/**
 * Route /user/login: Method POST
 */