import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Select from 'react-select'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export const ProductImage = ({ image }) => {
    return (
        <Col md={5} xs={12}>
            <Image src={process.env.REACT_APP_IMAGE_URL + image} fluid />
        </Col>
    )
}

export const ProductInfo = ({ product }) => {
    return (
        <Col md={7} xs={12}>
            <Row>
                <Col md={10} xs={12}>
                    <h4>{product.product_name}</h4>
                    <p>{product.description}</p>
                </Col>
            </Row>
            <Row>
                <Col md={8} xs={12}>
                    <Form.Label>Options</Form.Label>
                    <Select
                        options={product.variants}
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={3} xs={6} >
                    <Form.Label>Quantity</Form.Label>
                    <InputGroup style={{ zIndex: 0 }}>
                        <InputGroup.Append>
                            <Button variant="outline-success" size="sm">-</Button>
                        </InputGroup.Append>
                        <FormControl
                            size="sm"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-success" size="sm">+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Button variant="success">
                        Add To Cart
                    </Button>
                </Col>
            </Row>
        </Col>
    )
}
