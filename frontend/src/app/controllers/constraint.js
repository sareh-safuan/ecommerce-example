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
            default:
                break
        }
    }
    return obj
}