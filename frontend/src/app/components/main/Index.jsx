import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
    Card, CardImage, Image, CardBody, CardTitle, CardFooter, Button
} from '../../Core.jsx'

class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            fruits: []
        }
        this.clickHandler = this.clickHandler.bind(this)
    }

    componentDidMount() {
        axios({
            url: '/product'
        })
            .then(res => {
                const { data: fruits } = res.data
                this.setState({ fruits })
            })
            .catch(err => {
                throw err
            })
    }

    clickHandler(e) {
        if (e.target.tagName === "BUTTON") {
            const id = e.target.id
            this.props.history.push(`/product/${id}`)
        }
    }

    render() {
        const { fruits } = this.state
        
        if (!fruits.length) {
            return <div>Loading...</div>
        }

        return (
            <div className="container" onClick={this.clickHandler}>
                <div className="product-list">
                    <FruitList fruits={fruits.slice(0, 4)} />
                </div>
                <div className="product-list">
                    <FruitList fruits={fruits.slice(4, 8)} />
                </div>
                <div className="product-list">
                    <FruitList fruits={fruits.slice(8, 12)} />
                </div>
            </div>
        )
    }
}

const FruitList = ({ fruits }) => {
    return fruits.map((fruit, i) => {
        return (
            <Card className="card-shadow width-20" key={i}>
                <CardImage>
                    <Image src={`http://localhost:4000/${fruit.image}`} alt="temporary" />
                </CardImage>
                <CardBody className="product-card-height">
                    <CardTitle>{fruit.product_name}</CardTitle>
                    <div className="card-text">
                        {fruit.description.slice(0, 70)}
                    </div>
                    <CardFooter>
                        <Button
                            className="pure-button-primary"
                            text={`Buy Now - RM${fruit.price.toFixed(2)}`}
                            clickHandler={null}
                            id={`${fruit.id}/${fruit.slug}`}
                        />
                    </CardFooter>
                </CardBody>
            </Card>
        )
    })
}

export default Index