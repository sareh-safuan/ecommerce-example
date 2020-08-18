import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

const List = ({ list }) => {
    return (
        <Row>
            {
                list.map((product, idx) => (
                    <Col md={3} xs={12} key={idx}>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={process.env.REACT_APP_IMAGE_URL + product.image}
                            />
                            <Card.Body>
                                <Card.Title>
                                    {product.product_name}
                                </Card.Title>
                                <Card.Text style={{ minHeight: '80px' }}>
                                    {product.description.slice(0, 80)}
                                </Card.Text>
                                <Link
                                    to={'product/' + product.slug}
                                    className="btn btn-success"
                                >
                                    Buy Now
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}

const IndexDisplay = ({ products }) => {

    if (!products.length) {
        return <span></span>
    }

    return (
        <Container>
            <List list={products.slice(0, 4)} />
            <List list={products.slice(4, 8)} />
            <List list={products.slice(8, 12)} />
        </Container>
    )
}

export default IndexDisplay