import React from 'react'
import { Label, BlockInput, Button, Card, CardBody, CardTitle } from '../../Core.jsx'

class Profile extends React.Component {
    constructor() {
        super()

        this.clickHandler = this.clickHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
    }

    clickHandler() { }
    inputHandler() { }

    render() {
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
                                css="width-60"
                                changeHandler={this.inputHandler}
                            />
                            <Label htmlFor="" text="Last Name" />
                            <BlockInput
                                type="text"
                                css="width-60"
                                changeHandler={this.inputHandler}
                            />
                            <Label htmlFor="" text="Email" />
                            <BlockInput
                                type="text"
                                css="width-60"
                                changeHandler={this.inputHandler}
                            />
                            <Label htmlFor="" text="Phone Number" />
                            <BlockInput
                                type="text"
                                css="width-60"
                                changeHandler={this.inputHandler}
                            />
                            <div style={{ marginTop: '5px' }}>
                                <Button 
                                    css="pure-button-primary" 
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