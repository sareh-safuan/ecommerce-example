import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import validate from 'validate.js'
import constraint from '../../controllers/constraint.js'
import { BlockInput, Label, Button, Ul, Li, Alert } from '../../Core.jsx'
import { emptyTheCart } from '../../controllers/redux/action.js'

/**
 * TODO:
 *  1) year constraint more than current year
 *  2) CC should cover more CC provider: VISA MC AMEX...
 *  3) validation before POST to api endpoint
 */

class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            credit_card: { value: '4111111111111111', error: '' },
            expiry_year: { value: '2022', error: '' },
            cvv: { value: '101', error: '' },
            addressses: [],
            address_id: null,
            total_price_paid: 0,
            shipping_fee: 5,
            alertType: '',
            alertText: ''
        }

        this.inputHandler = this.inputHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.radioHandler = this.radioHandler.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId')
        const { isUserLogin, cart } = this.props
        const { shipping_fee } = this.state
        const reducer = (acc, cur) => acc + cur
        const total_price_paid = cart
            .map(c => c.paying_price * c.quantity)
            .reduce(reducer, shipping_fee)

        if (isUserLogin && userId) {
            axios({
                method: 'GET',
                url: '/address/' + userId
            })
                .then(res => {
                    if (!res.data.success) {
                        throw new Error()
                    }

                    this.setState({
                        total_price_paid,
                        addressses: res.data.data
                    })
                })
                .catch(err => {
                    this.setState({
                        alertType: 'alert-danger',
                        alertText: 'Unexpected error. Please try again.'
                    })
                })
        }
    }

    inputHandler(e) {
        const { name, value } = e.target
        const attr = { [name]: value }

        const result = validate(attr, constraint([name]))
        const error = result ? result[name][0] : ''

        this.setState({
            [e.target.name]: {
                value: e.target.value,
                error
            }
        })
    }

    clickHandler() {
        const user_id = localStorage.getItem('userId')
        const { address_id, total_price_paid } = this.state
        const orders = this.props.cart.map(_ => ({
            product_id: _.product_id,
            product_variation_id: _.product_variation_id,
            paying_price: _.paying_price,
            quantity: _.quantity
        }))

        // 3) in todo list

        axios({
            method: 'POST',
            url: '/order/create',
            data: {
                user_id,
                address_id,
                total_price_paid,
                orders
            }
        })
            .then(res => {
                if (!res.data.success) {
                    throw new Error()
                }

                this.props.emptyTheCart()
                this.setState({
                    alertType: 'alert-success',
                    alertText: 'Your order has been successfully placed.'
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    alertType: 'alert-danger',
                    alertText: 'Error when placing the order. Please try again.'
                })
            })
    }

    radioHandler(e) {
        if (e.target.tagName === 'INPUT') {
            this.setState({
                address_id: +e.target.value
            })
        }
    }

    closeModal() {
        this.setState({
            alertType: '',
            alertText: ''
        })
    }

    render() {
        const { cart, isUserLogin } = this.props
        const {
            credit_card, expiry_year, cvv, addressses,
            total_price_paid, shipping_fee, alertText, alertType
        } = this.state

        const selectStyle = {
            control: base => ({
                ...base,
                height: 31,
                minHeight: 31
            }),
            indicatorSeparator: state => ({
                display: 'none'
            }),
            valueContainer: (provided, state) => ({
                ...provided,
                padding: '0 6px',
                marginBottom: '7px'
            }),
            indicatorsContainer: (provided, state) => ({
                display: 'none'
            })
        }
        const months = [
            { value: 1, label: 'January' },
            { value: 2, label: 'February' },
            { value: 3, label: 'March' },
            { value: 4, label: 'April' },
            { value: 5, label: 'May' },
            { value: 6, label: 'June' },
            { value: 7, label: 'July' },
            { value: 8, label: 'August' },
            { value: 9, label: 'September' },
            { value: 10, label: 'October' },
            { value: 11, label: 'September' },
            { value: 12, label: 'December' }
        ]

        if (!cart.length && alertType === 'alert-success') {
            return (
                <Alert
                    className={alertType}
                    clickHandler={this.closeModal}    
                >
                    {alertText}
                </Alert>
            )
        }

        if (!cart.length) {
            return <h4>Your cart is empty</h4>
        }

        if (cart.length && alertType === 'alert-danger') {
            return (
                <Alert className={alertType}>
                    {alertText}
                </Alert>
            )
        }

        if (!isUserLogin) {
            return (
                <Link to="/sign-in?reff=cart">
                    Please sign in before continue
                </Link>
            )
        }

        if (!addressses.length) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <Wrapper>
                <Checkout>
                    <Alert className={alertType}>
                        {alertText}
                    </Alert>
                    <List header="Shipping Address">
                        <div className="checkout-step-body" onClick={this.radioHandler}>
                            <Ul>
                                {
                                    addressses.map((addr, i) => {
                                        return (
                                            <Li key={i}>
                                                <label>
                                                    <div className="row">
                                                        <input
                                                            type="radio"
                                                            name="address_id"
                                                            value={addr.id}
                                                        />
                                                        <div style={{ marginBottom: '10px' }}>
                                                            <div><strong>{addr.tag}</strong></div>
                                                            <div>{addr.address_one}</div>
                                                            <div>{addr.address_two}</div>
                                                            <div>{addr.postcode}, {addr.city}</div>
                                                            <div>{addr.state}</div>
                                                        </div>
                                                    </div>
                                                </label>
                                            </Li>
                                        )
                                    })
                                }
                            </Ul>
                        </div>
                    </List>
                    <List header="Payment">
                        <div className="checkout-step-body">
                            <Label htmlFor="card-number" text="Card Number" />
                            <BlockInput
                                className="width-100"
                                type="text"
                                name="credit_card"
                                placeholder="Eg: 5500 0000 0000 0004"
                                field={credit_card}
                                inputHandler={this.inputHandler}
                            />

                            <div className="row">
                                <div className="width-80">
                                    <Label htmlFor="country" text="Expiry Date" />
                                    <div className="row">
                                        <div className="width-60">
                                            <Select
                                                options={months}
                                                onChange={this.changeHandler}
                                                styles={selectStyle}
                                                placeholder={<small>Expiry month</small>}
                                            />
                                        </div>
                                        <BlockInput
                                            className="width-90"
                                            type="text"
                                            name="expiry_year"
                                            field={expiry_year}
                                            placeholder="Expiry year"
                                            inputHandler={this.inputHandler}
                                            style={{
                                                margin: '0 5px'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="width-30">
                                    <Label htmlFor="cvv" text="CVV" />
                                    <BlockInput
                                        type="password"
                                        name="cvv"
                                        className="width-70"
                                        field={cvv}
                                        inputHandler={this.inputHandler}
                                    />
                                </div>
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <Label htmlFor="country" text="Country" />
                                <Select
                                    options={[{ value: 1, label: 'Malaysia' }]}
                                    className="width-100"
                                    onChange={this.changeHandler}
                                    styles={selectStyle}
                                />
                            </div>

                            <div>
                                <Button
                                    text="Pay Now"
                                    className="pure-button-primary"
                                    clickHandler={this.clickHandler}
                                    style={{
                                        marginTop: '5px'
                                    }}
                                />
                            </div>
                        </div>
                    </List>
                </Checkout>
                <Summary cart={cart} total={total_price_paid} shipping={shipping_fee} />
            </Wrapper>
        )
    }
}

const Wrapper = ({ children }) => {
    return (
        <div className="container">
            <div className="row">
                {children}
            </div>
        </div>
    )
}

const Checkout = ({ children }) => {
    return (
        <div className="card width-50">
            <ul className="pure-menu-list checkout">
                {children}
            </ul>
        </div>
    )
}

const List = ({ header, children }) => {
    return (
        <li className="pure-menu-item">
            <div className="row">
                <div className="container-full">
                    <div className="checkout-step-header">
                        {header}
                    </div>
                    {children}
                </div>
            </div>
        </li>
    )
}

const Summary = ({ cart, total, shipping }) => {
    return (
        <div className="card width-50">
            <div className="card">
                <div className="card-body order-summary">
                    <div className="row">
                        Order Summary
                    </div>
                    {
                        cart.map((c, i) => {
                            return (
                                <div className="row" key={i}>
                                    <div className="width-20">
                                        <img src={c.image} alt="yes" className="img-responsive" />
                                    </div>
                                    <div className="width-50">
                                        <p>{c.product_name}</p>
                                        {`${c.quantity} x RM ${(c.paying_price).toFixed(2)}`}
                                    </div>
                                    <div className="width-30">
                                        RM {(c.quantity * c.paying_price).toFixed(2)}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="row">
                        <div className="width-70">
                            <p>Shipping</p>
                            <p>Tax</p>
                        </div>
                        <div className="width-30">
                            <p>RM {shipping.toFixed(2)}</p>
                            <p>RM 0.00</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="width-70">
                            <h4>Total</h4>
                        </div>
                        <div className="width-30">
                            <h4>RM {(+total).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart.cart,
    isUserLogin: state.auth.isUserLogin
})

const mapDispatchToProps = dispatch => {
    return {
        emptyTheCart: () => dispatch(emptyTheCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)