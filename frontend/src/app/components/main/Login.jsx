import React from 'react'
import { Link } from 'react-router-dom'
import validate from 'validate.js'
import {
    Card, CardBody, Label, BlockInput, CardTitle, Button
} from '../../Core.jsx'
import constraint from '../../controllers/constraint.js'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: { value: '', error: '' },
            password: { value: '', error: '' },
            isLoading: false
        }

        this.clickHandler = this.clickHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
        this._validateInput = this._validateInput.bind(this)
    }

    clickHandler() {
        this.setState({ isLoading: true })
        const isPass = this._validateInput()

        if (!isPass) return

        console.log('pass to backend for login')
    }

    inputHandler(e) {
        const { name, value } = e.target
        const result = validate({ [name]: value }, constraint([name]))
        const error = result ? result[name][0] : ''

        this.setState({
            [name]: {
                value,
                error
            }
        })
    }

    _validateInput() {
        const { email, password } = this.state
        const result = validate({
            email: email.value,
            password: password.value
        }, constraint(['email', 'password']))

        if (!result) return true

        const keys = Object.keys(result)
        const failed = {}
        keys.forEach(el => {
            failed[el] = {
                value: '',
                error: result[el][0]
            }
        })

        this.setState({
            ...this.state,
            ...failed,
            isLoading: false
        })
    }

    render() {
        const { email, password, isLoading } = this.state

        return (
            <div className="width-40">
                <Card className="card-shadow" style={{
                    padding: '20px 20px 30px'
                }}>
                    <CardBody>
                        <CardTitle>
                            Sign In Form
                        </CardTitle>
                        <Label htmlFor="email" text="Email" />
                        <BlockInput
                            className="width-100"
                            type="email"
                            name="email"
                            field={email}
                            inputHandler={this.inputHandler}
                        />
                        <Label htmlFor="password" text="Password" />
                        <BlockInput
                            className="width-100"
                            type="password"
                            name="password"
                            field={password}
                            inputHandler={this.inputHandler}
                        />
                        <Button
                            className="pure-button-primary"
                            style={{ marginTop: '10px' }}
                            text='Sign In'
                            isLoading={isLoading}
                            clickHandler={this.clickHandler}
                        />
                        <RegisterLink />
                    </CardBody>
                </Card>
            </div>
        )
    }
}

const RegisterLink = () => {
    return (
        <div className="row-end" style={{ marginTop: '10px' }}>
            <small>
                <Link to="/register">Register Here</Link>
            </small>
        </div>
    )
}

export default Login