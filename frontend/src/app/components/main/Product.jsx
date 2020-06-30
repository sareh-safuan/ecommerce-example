import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../controllers/redux/action'
import { Card, CardImage, Image, CardBody, Button, Input } from '../../Core'
import Select from 'react-select'

class Product extends React.Component {
    constructor() {
        super()
        this.state = {
            fruit: {},
            variation: [],
            quantity: 1,
            payingPrice: 0
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
    }

    componentDidMount() {
        const { name } = this.props.match.params
        const fruit = this.props.fruits.find(f => f.name === name)
        setTimeout(() => {
            this.setState({
                fruit,
                payingPrice: fruit.price,
                variation: [
                    fruit.price,
                    fruit.price * 1.4,
                    fruit.price * 1.9
                ]
            })
        }, 500)
    }

    changeHandler(e) {
        const { variation } = this.state
        this.setState({
            payingPrice: variation[e.value]
        })
    }

    clickHandler(e) {
        const id = e.target.id
        let { quantity } = this.state

        if (id === "increment") {

            quantity++
            this.setState({ quantity })

        } else if (id === "decrement") {

            quantity = quantity > 1 ? --quantity : quantity
            this.setState({ quantity })

        } else if (id === "add-to-cart") {

            const { fruit, quantity, payingPrice } = this.state
            const cart = {
                ...fruit,
                quantity,
                payingPrice
            }
            this.props.addToCart(cart)
            
        }
    }

    inputHandler() {
        // TODO: add logic same as inc & dec click handler
    }

    render() {
        const { quantity, fruit, payingPrice } = this.state

        if (!fruit) {
            return <h4>error 404</h4>
        }

        if (!fruit.hasOwnProperty('image')) {
            return <p>Loading...</p>
        }

        const options = [
            {
                value: 0,
                label: `RM ${(fruit.price).toFixed(2)} - Small`
            },
            {
                value: 1,
                label: `RM ${(fruit.price * 1.4).toFixed(2)} - Medium`
            },
            {
                value: 2,
                label: `RM ${(fruit.price * 1.9).toFixed(2)} - Large`
            }
        ]

        return (
            <Wrapper>
                <Card css="width-40">
                    <CardImage>
                        <Image src={fruit.image} />
                    </CardImage>
                </Card>
                <Card css="width-60">
                    <CardBody>
                        <h2>{fruit.name}</h2>
                        <p>{fruit.description}</p>
                        <br />
                        <h4>RM {(payingPrice * quantity).toFixed(2)}</h4>
                        <div className="width-70">
                            <Select
                                options={options}
                                defaultValue={options[0]}
                                onChange={this.changeHandler} />
                        </div>
                        <div style={{
                            marginTop: '10px'
                        }}>
                            <Button
                                text=" - "
                                clickHandler={this.clickHandler}
                                id="decrement"
                            />
                            <Input
                                css="width-10"
                                type="text"
                                name="quantity"
                                value={quantity}
                                changeHandler={this.changeHandler}
                                style={{
                                    marginLeft: '5px',
                                    marginRight: '5px'
                                }}
                            />
                            <Button
                                text=" + "
                                clickHandler={this.clickHandler}
                                id="increment"
                            />
                        </div>
                        <Button
                            css="pure-button-primary"
                            text="Add To Cart"
                            clickHandler={this.clickHandler}
                            id="add-to-cart"
                            style={{
                                marginTop: '10px'
                            }}
                        />
                    </CardBody>
                </Card>
            </Wrapper>
        )
    }
}

const Wrapper = ({ children }) => (
    <div className="container">
        <div className="row">
            {children}
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: cart => dispatch(addToCart(cart))
    }
}

const mapStateToProps = (state) => {
    return { fruits: state.fruits.fruits }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)