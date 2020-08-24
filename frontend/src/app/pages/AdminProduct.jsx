import React from 'react'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

import Spinner from '../components/core/Spinner'

class AdminProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            loading: true
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/product'
        })
            .then(res => {
                const products = res.data.data

                this.setState({
                    products,
                    loading: false
                })
            })
            .catch(err => {
                this.props.showAlert({
                    show: true,
                    variant: 'danger',
                    text: 'Unexpected error.'
                })
            })
    }

    render() {
        const { loading, products } = this.state

        return (
            <Col>
                <Spinner loading={loading} />
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Display Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((pd, idx) => (
                                <tr key={idx}>
                                    <td></td>
                                    <td>
                                        <img
                                            src={process.env.REACT_APP_IMAGE_URL + pd.image}
                                            width="60" height="50"
                                            alt={pd.image}
                                        />
                                    </td>
                                    <td>{pd.product_name}</td>
                                    <td>{pd.display_price}</td>
                                    <td>
                                        <Link to={"/admin/product/" + pd.id}
                                            className="btn btn-sm btn-outline-secondary"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
        )
    }
}

export default AdminProduct