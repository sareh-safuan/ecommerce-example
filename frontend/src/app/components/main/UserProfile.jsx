import React from 'react'
import { Label, BlockInput, Button, Card, CardBody, CardTitle } from '../../Core.jsx'

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            first_name: { value: '', error: '' },
            last_name: { value: '', error: '' },
            email: { value: '', error: '' },
            phone_number: { value: '', error: '' }
        }

        this.clickHandler = this.clickHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
    }

    componentDidMount() {
        
    }

    clickHandler() { }
    inputHandler() { }

    render() {
        const { first_name, last_name, email, phone_number } = this.state

        return (
            <div className="width-80">
                <div className="my-profile">
                    <Card>
                        <CardTitle>
                            My Profile
                        </CardTitle>
                        <CardBody>
                            <Label htmlFor="" text="First Name" />
                            <BlockInput
                                type="text"
                                className="width-60"
                                field={first_name}
                                inputHandler={this.inputHandler}
                            />
                            <Label htmlFor="" text="Last Name" />
                            <BlockInput
                                type="text"
                                className="width-60"
                                field={last_name}
                                inputHandler={this.inputHandler}
                            />
                            <Label htmlFor="" text="Email" />
                            <BlockInput
                                type="text"
                                className="width-60"
                                field={email}
                                inputHandler={this.inputHandler}
                            />
                            <Label htmlFor="" text="Phone Number" />
                            <BlockInput
                                type="text"
                                className="width-60"
                                field={phone_number}
                                inputHandler={this.inputHandler}
                            />
                            <div style={{ marginTop: '5px' }}>
                                <Button
                                    className="pure-button-primary"
                                    text="Update"
                                    clickHandler={this.clickHandler}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Profile