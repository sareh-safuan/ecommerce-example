import React from 'react'
import axios from 'axios'
import validate from 'validate.js'
import constraint from '../../controllers/constraint.js'
import {
    Card, CardBody, Label, BlockInput, CardTitle, Button, Alert
} from '../../Core.jsx'


class Register extends React.Component {
    constructor() {
        super()

        this.state = {
            first_name: { value: '', error: '' },
            last_name: { value: '', error: '' },
            email: { value: '', error: '' },
            phone_number: { value: '', error: '' },
            password: { value: '', error: '' },
            password_confirmation: { value: '', error: '' },
            usergroup_id: 1,
            alertType: false,
            alertText: '',
            isLoading: false
        }

        this.inputHandler = this.inputHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
        this._validateInput = this._validateInput.bind(this)
    }

    inputHandler(e) {
        const { name, value } = e.target
        const attr = { [name]: value }

        if (name === 'password_confirmation') {
            attr['password'] = this.state.password.value
        }

        const result = validate(attr, constraint([name]))
        const error = result ? result[name][0] : ''

        this.setState({
            [e.target.name]: {
                value: e.target.value,
                error
            }
        })
    }

    clickHandler() {
        this.setState({ isLoading: true })
        const isPass = this._validateInput()

        if(!isPass) {
            return
        }

        const {
            first_name,
            last_name,
            email,
            phone_number,
            password,
            password_confirmation,
            usergroup_id
        } = this.state

        axios({
            method: 'POST',
            url: '/user/register',
            data: {
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                phone_number: phone_number.value,
                password: password.value,
                password_confirmation: password_confirmation.value,
                usergroup_id
            }
        })
            .then((res) => {
                if (res.status !== 201) throw new Error()

                this.setState({
                    first_name: { value: '', error: '' },
                    last_name: { value: '', error: '' },
                    email: { value: '', error: '' },
                    phone_number: { value: '', error: '' },
                    password: { value: '', error: '' },
                    password_confirmation: { value: '', error: '' },
                    alertType: 'alert-success',
                    alertText: 'Registration successful.',
                    isLoading: false
                })
            })
            .catch((err) => {
                console.log(err.response)
                this.setState({
                    alertType: 'alert-danger',
                    alertText: 'Error when registering. Please try again.',
                    isLoading: false,
                    password: { value: '', error: '' },
                    password_confirmation: { value: '', error: '' }
                })
            })
    }

    closeAlert() {
        this.setState({
            alertType: false,
            alertText: ''
        })
    }

    _validateInput() {
        const {
            first_name,
            last_name,
            email,
            phone_number,
            password,
            password_confirmation
        } = this.state

        const _constraint = constraint([
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'password',
            'password_confirmation'
        ])
        // TODO: change errors to result
        const errors = validate({
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            phone_number: phone_number.value,
            password: password.value,
            password_confirmation: password_confirmation.value
        }, _constraint)

        if (!errors) {
            return true
        }

        const keys = Object.keys(errors)
        const failed = {}
        keys.forEach(el => {
            failed[el] = {
                value: '',
                error: errors[el][0]
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
            first_name, last_name, email, phone_number, password,
            password_confirmation, alertType, alertText, isLoading
        } = this.state

        return (
            <div className="width-40">
                <Card className="card-shadow"
                    style={{ padding: '20px 25px 30px' }}
                >
                    <CardBody>
                        <Alert
                            clickHandler={this.closeAlert}
                            className={alertType}
                        >
                            {alertText}
                        </Alert>
                        <CardTitle>
                            <h4>Registration Form</h4>
                        </CardTitle>
                        <Label htmlFor="first_name" text="First Name" />
                        <BlockInput
                            className="width-100"
                            type="text"
                            name="first_name"
                            field={first_name}
                            inputHandler={this.inputHandler}
                        />
                        <Label htmlFor="last_name" text="Last Name" />
                        <BlockInput
                            className="width-100"
                            type="text"
                            name="last_name"
                            field={last_name}
                            inputHandler={this.inputHandler}
                        />
                        <Label htmlFor="email" text="Email" />
                        <BlockInput
                            className="width-100"
                            type="email"
                            name="email"
                            field={email}
                            inputHandler={this.inputHandler}
                        />
                        <Label htmlFor="phone_number" text="Phone Number" />
                        <BlockInput
                            className="width-100"
                            type="text"
                            name="phone_number"
                            field={phone_number}
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
                        <Label htmlFor="password_confirmation" text="Password Confirmation" />
                        <BlockInput
                            className="width-100"
                            type="password"
                            name="password_confirmation"
                            field={password_confirmation}
                            inputHandler={this.inputHandler}
                        />
                        <Button
                            text="Register"
                            className="pure-button-primary"
                            isLoading={isLoading}
                            clickHandler={this.clickHandler}
                            style={{
                                marginTop: '10px'
                            }}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Register