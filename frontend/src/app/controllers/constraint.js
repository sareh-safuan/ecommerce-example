const presence = {
    allowEmpty: false
}

const first_name = {
    presence,
    length: {
        minimum: 1,
        maximum: 20
    }
}

const last_name = {
    presence,
    length: {
        minimum: 1,
        maximum: 20
    }
}

const email = {
    presence,
    email: true
}

const phone_number = {
    presence,
    length: {
        minimum: 8,
        maximum: 20
    }
}

const password = {
    presence,
    length: {
        minimum: 8,
        maximum: 32
    }
}

const password_confirmation = {
    equality: 'password'
}

const address_one = {
    presence,
    length: {
        maximum: 250
    }
}

const address_two = {
    length: {
        maximum: 250
    }
}

const postal_code = {
    presence,
    length: {
        maximum: 15
    }
}

const city = {
    presence,
    length: {
        maximum: 50
    }
}

const credit_card = {
    presence,
    format: {
        pattern: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
    }
}

const expiry_year = {
    presence,
    length: {
        minimum: 4,
        maximum: 4
    },
    numericality: {
        onlyInteger: true
    }
}

const cvv = {
    presence,
    length: {
        minimum: 3,
        maximum: 3
    },
    numericality: {
        onlyInteger: true
    }
}

export default function (keys) {
    const obj = {}

    for (let key of keys) {
        switch (key) {
            case 'first_name':
                obj[key] = first_name
                break
            case 'last_name':
                obj[key] = last_name
                break
            case 'email':
                obj[key] = email
                break
            case 'phone_number':
                obj[key] = phone_number
                break
            case 'password':
                obj[key] = password
                break
            case 'password_confirmation':
                obj[key] = password_confirmation
                break
            case 'address_one':
                obj[key] = address_one
                break
            case 'address_two':
                obj[key] = address_two
                break
            case 'postal_code':
                obj[key] = postal_code
                break
            case 'city':
                obj[key] = city
                break
            case 'credit_card':
                obj[key] = credit_card
                break
            case 'expiry_year':
                obj[key] = expiry_year
                break
            case 'cvv':
                obj[key] = cvv
                break
            default:
                break
        }
    }
    return obj
}