import React from 'react'
import { BlockInput, Label, Button, Card, CardBody, CardTitle } from '../../Core.jsx'

class Security extends React.Component {
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
                <div className="my-change-password">
                    <Card>
                        <CardTitle>
                            Change Password
                            </CardTitle>
                        <CardBody>
                            <Label htmlFor="" text="Current Password" />
                            <BlockInput
                                type="password"
                                css="width-60"
                                changeHandler={this.inputHandler}
                            />
                            <Label htmlFor="" text="New Password" />
                            <BlockInput
                                type="password"
                                css="width-60"
                                changeHandler={this.inputHandler}
                            />
                            <Label htmlFor="" text="Current Password" />
                            <BlockInput
                                type="password"
                                css="width-60"
                                changeHandler={this.inputHandler}
                            />
                            <div style={{ marginTop: '5px' }}>
                                <Button 
                                    css="pure-button-primary" 
                                    text="Submit" 
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

export default Security