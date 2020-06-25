import React from 'react'
import {
    Card, CardBody, Label, BlockInput, CardTitle, Button
} from '../../Core.jsx'

class Register extends React.Component {
    constructor() {
        super()

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            password: '',
            password_confirmation: '',
            usergroup_id: 1
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clickHandler() {
        // TODO: 
        // 1) validate input
        // 2) post data to server
    }

    render() {
        const {
            first_name, last_name, email, phone_number,
            password, password_confirmation
        } = this.state

        return (
            <div className="width-40">
                <Card css="card-shadow"
                    style={{ padding: '20px' }}
                >
                    <CardBody>
                        <CardTitle>
                            <h4>Registration Form</h4>
                        </CardTitle>
                        <Label htmlFor="first_name" text="First Name" />
                        <BlockInput
                            css="width-100"
                            type="text"
                            name="first_name"
                            value={first_name}
                            changeHandler={this.changeHandler}
                        />
                        <Label htmlFor="last_name" text="Last Name" />
                        <BlockInput
                            css="width-100"
                            type="text"
                            name="last_name"
                            value={last_name}
                            changeHandler={this.changeHandler}
                        />
                        <Label htmlFor="email" text="Email" />
                        <BlockInput
                            css="width-100"
                            type="email"
                            name="email"
                            value={email}
                            changeHandler={this.changeHandler}
                        />
                        <Label htmlFor="phone_number" text="Phone Number" />
                        <BlockInput
                            css="width-100"
                            type="text"
                            name="phone_number"
                            value={phone_number}
                            changeHandler={this.changeHandler}
                        />
                        <Label htmlFor="password" text="Password" />
                        <BlockInput
                            css="width-100"
                            type="password"
                            name="password"
                            value={password}
                            changeHandler={this.changeHandler}
                        />
                        <Label htmlFor="password_confirmation" text="Password Confirmation" />
                        <BlockInput
                            css="width-100"
                            type="password"
                            name="password_confirmation"
                            value={password_confirmation}
                            changeHandler={this.changeHandler}
                        />
                        <Button
                            css="pure-button-primary"
                            text="Submit"
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