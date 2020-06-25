import React from 'react'
import { Link } from 'react-router-dom'
import {
    Card, CardBody, Label, BlockInput, CardTitle, Button
} from '../../Core.jsx'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }

        this.clickHandler = this.clickHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    clickHandler() {
        this.props.history.push({
            pathname: '/user'
        })
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        const { email, password } = this.state

        return (
            <div className="width-40">
                <Card css="card-shadow" style={{
                    padding: '20px'
                }}>
                    <CardBody>
                        <CardTitle>
                            Sign In Form
                        </CardTitle>
                        <Label htmlFor="email" text="Email" />
                        <BlockInput
                            css="width-100"
                            type="email"
                            name="email"
                            value={email}
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
                        <Button
                            css="pure-button-primary"
                            style={{ marginTop: '10px' }}
                            text='Sign In'
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