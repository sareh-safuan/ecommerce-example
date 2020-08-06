import React from 'react'
import axios from 'axios'
import { Label, BlockInput, Button, Card, CardBody, CardTitle, Alert }
    from '../../Core.jsx'

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            alertType: '',
            alertText: '',
            isLoading: true,
            first_name: { value: '', error: '' },
            last_name: { value: '', error: '' },
            email: { value: '', error: '' },
            phone_number: { value: '', error: '' }
        }

        this.clickHandler = this.clickHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId')

        if (!userId) {
            this.setState({
                alertType: 'alert-danger',
                alertText: 'Unexpected error.'
            })
            return
        }

        axios({
            method: 'GET',
            url: '/user/' + userId
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    clickHandler() { }
    inputHandler() { }

    render() {
        const {
            first_name, last_name, email, phone_number, alertType, alertText, isLoading
        } = this.state

        if (isLoading && alertType === '') {
            return <div>Loading...</div>
        }

        return (
            <div className="width-80">
                <div className="my-profile">
                    <Alert className={alertType}>
                        {alertText}
                    </Alert>
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