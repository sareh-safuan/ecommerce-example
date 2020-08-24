import React from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { ProductImage } from '../components/main/ProductDisplay'

class AdminProductDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            product: {},
            variants: []
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id

        axios({
            method: 'GET',
            url: '/product/' + id,
        })
            .then(res => {
                const temp = res.data.data
                const { image, product_name, display_price, description } = temp[0]
                const product = { image, product_name, display_price, description }

                this.setState({
                    product,
                    variants: temp,
                    loading: false
                })

            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { product, variants } = this.state

        return (
            <Col>
                <Row>
                    <Col md={5} xs={12}>
                        <Image src={process.env.REACT_APP_IMAGE_URL + product.image} fluid />
                        <Form.Group>
                            <br />
                            <Form.File/>
                        </Form.Group>
                    </Col>
                    <Col md={7} xs={12}>
                        <Form style={{ fontSize: '14px' }}>
                            <Form.Group>
                                <Form.Label>Product Name:</Form.Label>
                                <Form.Control type="text" defaultValue={product.product_name} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Display Price:</Form.Label>
                                <Form.Control type="text" defaultValue={product.display_price} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    defaultValue={product.description}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="success" size="sm" className="float-right">
                                    Update
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped className="mt-4">
                            <thead>
                                <tr className="d-flex">
                                    <th className="col-1">#</th>
                                    <th className="col-2">Quantity</th>
                                    <th className="col-2">Price</th>
                                    <th className="col-6">Description</th>
                                    <th className="col-1">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    variants.map((vr, idx) => (
                                        <tr key={idx} className="d-flex">
                                            <td className="col-1">{idx + 1}</td>
                                            <td className="col-2">
                                                <Form.Control
                                                    type="text"
                                                    defaultValue={vr.quantity}
                                                />
                                            </td>
                                            <td className="col-2">
                                                <Form.Control
                                                    type="text"
                                                    defaultValue={vr.price}
                                                />
                                            </td>
                                            <td className="col-6">
                                                <Form.Control
                                                    type="text"
                                                    defaultValue={vr.variation_description}
                                                />
                                            </td>
                                            <td className="col-1">
                                                <Button variant="outline-secondary" size="sm">
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default AdminProductDetail