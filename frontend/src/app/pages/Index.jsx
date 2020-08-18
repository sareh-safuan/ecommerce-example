import React, { Fragment } from 'react'
import axios from 'axios'

import Alert from '../components/core/Alert'
import Spinner from '../components/core/Spinner'
import IndexDisplay from '../components/main/IndexDisplay'

class Product extends React.Component {
    constructor() {
        super()

        this.state = {
            products: [],
            loading: true,
            alert: {
                show: false,
                variant: '',
                text: ''
            }
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
                    loading: false,
                    products
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    alert: {
                        show: true,
                        variant: 'danger',
                        text: 'Unexpected error. Please try again'
                    }
                })
            })
    }

    render() {
        const { alert, loading, products } = this.state

        return (
            <Fragment>
                <Spinner loading={loading} />
                <Alert alert={alert} />
                <IndexDisplay products={products} />
            </Fragment>
        )
    }
}

export default Product