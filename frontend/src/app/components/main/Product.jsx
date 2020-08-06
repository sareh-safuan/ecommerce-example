import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { addToCart } from '../../controllers/redux/action'
import { Card, CardImage, Image, CardBody, Button, Input, Alert } from '../../Core'
import Select from 'react-select'

class Product extends React.Component {
    constructor() {
        super()
        this.state = {
            fruit: {},
            variations: [],
            quantity: 1,
            paying_price: 0,
            product_variation_id: 0,
            alertType: '',
            alertText: ''
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount() {
        const { id } = this.props.match.params
        axios({
            url: `/product/${id}`
        })
            .then(res => {
                if (!res.data.success) {
                    throw new Error()
                }

                const fruit = res.data.data
                const product_variation_id = fruit.variations[0].id
                const paying_price = fruit.variations[0].price
                const variations = fruit.variations.map(f => {
                    const label = fruit.product_name + ' pack '
                        + f.variation_description + ' - RM' + f.price.toFixed(2)
                    return {
                        value: f.id,
                        label
                    }
                })

                this.setState({
                    fruit,
                    product_variation_id,
                    paying_price,
                    variations
                })
            })
            .catch(err => {
                this.setState({
                    alertType: 'alert-danger',
                    alertText: 'Error fetching product. Please try again.'
                })
            })
    }

    changeHandler(e) {
        const { variations } = this.state.fruit
        const selected = variations.find(v => v.id === e.value)

        this.setState({
            product_variation_id: selected.id,
            paying_price: selected.price
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

            const {
                fruit: { product_name, image },
                product_variation_id,
                paying_price,
                quantity
            } = this.state
            const product_id = +this.props.match.params.id

            const cart = {
                product_name,
                image,
                product_id,
                product_variation_id,
                paying_price,
                quantity
            }
            this.props.addToCart(cart)
            this.setState({
                alertType: 'alert-success',
                alertText: 'Product added to cart.'
            })
        }
    }

    inputHandler() {
        // TODO: add logic same as inc & dec click handler
    }

    closeModal() {
        this.setState({
            alertType: '',
            alertText: ''
        })
    }

    render() {
        const {
            quantity, fruit, paying_price, variations, alertType, alertText
        } = this.state

        if (!fruit) {
            return <h4>error 404</h4>
        }

        if (!fruit.hasOwnProperty('image') && alertType === 'alert-danger') {
            return (
                <Alert className={alertType}>
                    {alertText}
                </Alert>
            )
        }

        if (!fruit.hasOwnProperty('image')) {
            return <div>Loading...</div>
        }

        return (
            <Wrapper>
                <Card className="width-40">
                    <CardImage>
                        <Image src={`${process.env.REACT_APP_IMAGE_URL}${fruit.image}`} />
                    </CardImage>
                </Card>
                <Card className="width-60">
                    <Alert
                        className={alertType}
                        clickHandler={this.closeModal}
                    >
                        {alertText}
                    </Alert>
                    <CardBody>
                        <h2>{fruit.product_name}</h2>
                        <p>{fruit.description}</p>
                        <br />
                        <h4>RM {(paying_price * quantity).toFixed(2)}</h4>
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