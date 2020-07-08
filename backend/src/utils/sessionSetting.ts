const sessionSetting = function () {
    const environment: any = process.env.NODE_ENV
    const secret: any = process.env.SESSION_SECRET

    const options = {
        secret,
        resave: false,
        saveUninitialized: false,
        name: 'premium-fruit',
        cookie: {
            secure: false
        }
    }

    if (environment === "production") {
        options.cookie.secure = true
    }

    return options
}

export default sessionSetting