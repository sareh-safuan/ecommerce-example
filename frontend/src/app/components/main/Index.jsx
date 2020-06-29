import React from 'react'
import { connect } from 'react-redux'
import {
    Card, CardImage, Image, CardBody, CardTitle, CardFooter, Button
} from '../../Core.jsx'

class Index extends React.Component {
    constructor() {
        super()
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(e) {
        if (e.target.tagName === "BUTTON") {
            const id = e.target.id
            this.props.history.push(`/product/${id}`)
        }
    }

    render() {
        const { fruits } = this.props

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
            <Card css="card-shadow width-20" key={i}>
                <CardImage>
                    <Image src={fruit.image} alt="temporary" />
                </CardImage>
                <CardBody css="product-card-height">
                    <CardTitle>{fruit.name}</CardTitle>
                    <div className="card-text">
                        <p className="product-price">RM {fruit.price}</p>
                        {fruit.description}
                    </div>
                    <CardFooter>
                        <Button
                            css="pure-button-primary"
                            text="Add To Basket"
                            clickHandler={null}
                            id={fruit.name}
                        />
                    </CardFooter>
                </CardBody>
            </Card>
        )
    })
}

const mapStateToProps = (state) => {
    return { fruits: state.fruits.fruits }
} 

export default connect(mapStateToProps)(Index)