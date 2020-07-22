import React from 'react'
import { Link } from 'react-router-dom'
import validate from 'validate.js'
import { connect } from 'react-redux'
import axios from 'axios'
import queryString from 'query-string'
import constraint from '../../controllers/constraint.js'
import { successLogin } from '../../controllers/redux/action.js'
import {
    Card, CardBody, Label, BlockInput, CardTitle, Button, Alert
} from '../../Core.jsx'


class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: { value: '', error: '' },
            password: { value: '', error: '' },
            alertType: false,
            alertText: '',
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

        const {
            email: { value: email },
            password: { value: password }
        } = this.state

        axios({
            method: 'POST',
            url: '/user/login',
            data: {
                email,
                password
            }
        })
            .then((res) => {
                if (!res.data.success) {
                    throw new Error('Login failed.')
                }

                const qs = this.props.location.search
                const { reff } = qs ? queryString.parse(qs) : { reff: 'user' }
                const { id } = res.data.data

                localStorage.setItem('userId', id)
                this.props.successLogin(true)
                this.props.history.push('/' + (reff || ''))
            })
            .catch(err => {
                console.log(err.response)
                this.setState({
                    alertType: 'alert-danger',
                    alertText: 'Login failed.',
                    password: { value: '', error: '' },
                    isLoading: false
                })
            })
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
        const {
            email, password, isLoading,
            alertType, alertText
        } = this.state

        return (
            <div className="width-40">
                <Card className="card-shadow" style={{
                    padding: '20px 20px 30px'
                }}>
                    <CardBody>
                        <Alert
                            className={alertType}
                            clickHandler={null}
                        >
                            {alertText}
                        </Alert>
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

const mapDispatchToProps = (dispatch) => {
    return {
        successLogin: auth => dispatch(successLogin(auth))
    }
}

export default connect(null, mapDispatchToProps)(Login)