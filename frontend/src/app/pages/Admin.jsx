import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import Row from 'react-bootstrap/Row'

import Alert from '../components/core/Alert'
import AdminMenu from '../components/main/AdminMenu'
import AdminDashboard from './AdminDashboard'
import AdminOrder from './AdminOrder'
import AdminOrderDetail from './AdminOrderDetail'
import AdminProduct from './AdminProduct'
import AdminProductDetail from './AdminProductDetail'

class Admin extends React.Component {
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
        this.closeAlert = this.closeAlert.bind(this)
    }

    showAlert(alert) {
        this.setState({ alert })
    }

    closeAlert() {
        this.setState({
            alert: {
                show: false,
                variant: '',
                text: ''
            }
        })
    }

    render() {
        const { alert } = this.state

        return (
            <Fragment>
                <Alert alert={alert} closeAlert={this.closeAlert} />
                <Row>
                    <AdminMenu />
                    <Switch>
                        <Route path="/admin" exact>
                            <AdminDashboard  showAlert={this.showAlert} />
                        </Route>
                        <Route path="/admin/order" exact>
                            <AdminOrder showAlert={this.showAlert} />
                        </Route>
                        <Route 
                            path="/admin/order/:order/:user/:address"
                            component={AdminOrderDetail}
                        />
                        <Route path="/admin/product" exact>
                            <AdminProduct showAlert={this.showAlert} />
                        </Route>
                        <Route
                            path="/admin/product/:id"
                            component={AdminProductDetail}
                        />
                    </Switch>
                </Row>
            </Fragment>
        )
    }
}

export default Admin
