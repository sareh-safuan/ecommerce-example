import React, { Fragment } from 'react'
import Row from 'react-bootstrap/Row'
import { Switch, Route } from 'react-router-dom'

import Alert from '../components/core/Alert'
import UserMenu from '../components/main/UserMenu'
import UserHome from './UserHome'
import UserProfile from './UserProfile'
import UserAddress from './UserAddress'
import UserOrder from './UserOrder'

class User extends React.Component {
    constructor() {
        super()

        this.state = {
            alert: {
                show: false,
                variant: '',
                text: ''
            }
        }

        this.showAlert = this.showAlert.bind(this)
    }

    showAlert(alert) {
        this.setState({ alert })
    }

    render() {
        const { alert } = this.state

        return (
            <Fragment>
                <Alert alert={alert} />
                <Row>
                    <UserMenu />
                    <Switch>
                        <Route path="/user" exact>
                            <UserHome showAlert={this.showAlert} />
                        </Route>
                        <Route path="/user/profile">
                            <UserProfile showAlert={this.showAlert} />
                        </Route>
                        <Route path="/user/address">
                            <UserAddress showAlert={this.showAlert} />
                        </Route>
                        <Route path="/user/order">
                            <UserOrder showAlert={this.showAlert} />
                        </Route>
                    </Switch>
                </Row>
            </Fragment>
        )
    }
}

export default User