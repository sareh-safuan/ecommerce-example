import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { addToCart } from '../../controllers/redux/action'
import { Card, CardImage, Image, CardBody, Button, Input } from '../../Core'
import Select from 'react-select'

class Product extends React.Component {
    constructor() {
        super()
        this.state = {
            fruit: {},
            variations: [],
            quantity: 1,
            payingPrice: 0
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
    }

    componentDidMount() {
        const { id } = this.props.match.params
        axios({
            url: `/product/${id}`
        })
            .then(res => {
                const fruit = res.data.data
                const payingPrice = fruit.variations[0].price
                const variations = fruit.variations.map(f => {
                    const label = fruit.product_name + ' pack ' 
                        + f.variation_description + ' - RM' + f.price.toFixed(2)
                    return {
                        value: f.id,
                        label
                    }
                })

                this.setState({ fruit, payingPrice, variations })
            })
            .catch(err => {
                throw err
            })
    }

    changeHandler(e) {
        const { variations } = this.state.fruit
        const selected = variations.find(v => v.id === e.value)
        const payingPrice = selected.price
        this.setState({ payingPrice })
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

            const { fruit: { product_name, image }, quantity, payingPrice } = this.state
            const cart = {
                product_name,
                image,
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
        const { quantity, fruit, payingPrice, variations } = this.state

        if (!fruit) {
            return <h4>error 404</h4>
        }

        if (!fruit.hasOwnProperty('image')) {
            return <div>Loading...</div>
        }

        return (
            <Wrapper>
                <Card className="width-40">
                    <CardImage>
                        <Image src={`http://localhost:4000/${fruit.image}`} />
                    </CardImage>
                </Card>
                <Card className="width-60">
                    <CardBody>
                        <h2>{fruit.product_name}</h2>
                        <p>{fruit.description}</p>
                        <br />
                        <h4>RM {(payingPrice * quantity).toFixed(2)}</h4>
                        <div className="width-70">
                            <Select
                                options={variations}
                                defaultValue={variations[0]}
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
                                inputHandler={this.changeHandler}
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
                            className="pure-button-primary"
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

export default connect(null, mapDispatchToProps)(Product)