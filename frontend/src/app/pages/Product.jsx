import React, { Fragment } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row'

import Alert from '../components/core/Alert'
import Spinner from '../components/core/Spinner'
import { ProductImage, ProductInfo } from '../components/main/ProductDisplay'

class Product extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            product: [],
            loading: true,
            alert: {
                show: false,
                variant: '',
                text: ''
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id

        axios({
            method: 'GET',
            url: '/product/' + id
        })
            .then(res => {
                const data = res.data.data
                const { id, image, product_name, description } = data[0]
                const variants = data.map(_ => ({
                    value: _.id,
                    label: _.variation_description + ' - RM ' + _.price
                }))

                this.setState({
                    loading: false,
                    product: {
                        id,
                        image,
                        product_name,
                        description,
                        variants
                    }
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    alert: {
                        show: true,
                        variant: 'danger',
                        text: 'Unxpected error. Please try again.'
                    }
                })
            })
    }

    render() {
        const { alert, loading, product } = this.state

        if (!product.hasOwnProperty('id')) {
            return <span></span>
        }

        return (
            <Fragment>
                <Alert alert={alert} />
                <Spinner loading={loading} />
                <Row>
                    <ProductImage image={product.image} />
                    <ProductInfo product={product} />
                </Row>
            </Fragment>
        )
    }
}

export default Product