import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'

import OrderDisplay from '../components/main/OrderDisplay'
import AddressDisplay from '../components/main/AddressDisplay'
import UserDisplay from '../components/main/UserDisplay'

class OrderDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addr: {},
            usr: {}
        }
    }

    componentDidMount() {
        const { user, address } = this.props.match.params

        axios.all([
            axios({
                method: 'GET',
                url: '/address/' + address
            }),
            axios({
                method: 'GET',
                url: '/user/' + user
            })
        ])
            .then(axios.spread((...res) => {
                const addr = res[0].data.data[0]
                const usr = res[1].data.data[0]

                this.setState({
                    addr,
                    usr
                })
            }))
            .catch(err => console.log(err))
    }

    render() {
        const { order } = this.props.match.params
        const { usr, addr } = this.state

        return (
            <Col>
                <Row>
                    <Col>
                        <OrderDisplay url={`/order/${order}`} />
                    </Col>
                </Row>
                <Row>
                    <Col md={5} xs={12}>
                        <UserDisplay usr={usr} />
                    </Col>
                    <Col md={7} xs={12}>
                        <AddressDisplay addr={addr} />
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default OrderDetail