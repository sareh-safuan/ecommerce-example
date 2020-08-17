import React, { Fragment } from 'react'
import Alert from '../components/Alert'
import Spinner from '../components/Spinner'

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
        setTimeout(() => {
            this.setState({
                loading: false,
                alert: {
                    show: true,
                    variant: 'success',
                    text: 'EMILIA TAN MAJI TENSHI'
                }
            })
        }, 1200)
    }

    render() {
        const { alert, loading } = this.state

        return (
            <Fragment>
                <Spinner loading={loading} />
                <Alert alert={alert} />
            </Fragment>
        )
    }
}

export default Product