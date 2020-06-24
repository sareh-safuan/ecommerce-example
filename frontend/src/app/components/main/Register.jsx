import React from 'react'
import {
    Card, CardBody, Label, BlockInput, CardTitle, Button
} from '../../Core.jsx'

class Register extends React.Component {
    constructor() {
        super()

        this.state = {
            first_name: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { first_name } = this.state

        return (
            <div className="width-40">
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h4>Registration Form</h4>
                        </CardTitle>
                        <Label
                            htmlFor="first_name"
                            text="First Name"
                        />
                        <BlockInput
                            css="width-100"
                            type="text"
                            name="first_name"
                            value={first_name}
                            changeHandler={this.handleChange}
                        />
                        {/* <Label
                            htmlFor="last_name"
                            text="Last Name"
                        />
                        <BlockInput
                            css="width-100"
                            type="text"
                            name="last_name"
                        />
                        <Label
                            htmlFor="email"
                            text="Email"
                        />
                        <BlockInput
                            css="width-100"
                            type="email"
                            name="email"
                        />
                        <Label
                            htmlFor="phone_number"
                            text="Phone Number"
                        />
                        <BlockInput
                            css="width-100"
                            type="text"
                            name="phone_number"
                        />
                        <Label
                            htmlFor="password"
                            text="Password"
                        />
                        <BlockInput
                            css="width-100"
                            type="password"
                            name="password"
                        />
                        <Label
                            htmlFor="password_confirmation"
                            text="Password Confirmation"
                        />
                        <BlockInput
                            css="width-100"
                            type="password"
                            name="password_confirmation"
                        /> */}
                        <Button
                            css="pure-button-primary"
                            text="Submit"
                            onClick={null}
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