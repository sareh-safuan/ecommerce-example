import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import Select from 'react-select'
import validate from 'validate.js'
import constraint from '../../controllers/constraint.js'
import { BlockInput, Label, Button } from '../../Core.jsx'

/**
 * TODO:
 *  1) year constraint more than current year
 *  2) CC should cover more CC provider: VISA MC AMEX...
 *  3) 
 * 
 */

class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            credit_card: { value: '', error: '' },
            expiry_year: { value: '', error: '' },
            cvv: { value: '', error: '' }
        }

        this.inputHandler = this.inputHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
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
    clickHandler() { }
    changeHandler() { }


    render() {
        const { cart } = this.props
        const {
            credit_card, expiry_year, cvv
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

        if (!cart.length) {
            return <h4>Your cart is empty</h4>
        }

        return (
            <Wrapper>
                <Checkout>
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
                                        type="text"
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
                <Summary cart={cart} />
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

const Summary = ({ cart }) => {
    let total = 0
    let shipping = 4.00
    return (
        <div className="card width-50">
            <div className="card">
                <div className="card-body order-summary">
                    <div className="row">
                        Order Summary
                    </div>
                    {
                        cart.map((c, i) => {
                            total += (c.quantity * c.payingPrice)
                            return (
                                <div className="row" key={i}>
                                    <div className="width-20">
                                        <img src={c.image} alt="yes" className="img-responsive" />
                                    </div>
                                    <div className="width-50">
                                        <p>{c.product_name}</p>
                                        {`${c.quantity} x RM ${(c.payingPrice).toFixed(2)}`}
                                    </div>
                                    <div className="width-30">
                                        RM {(c.quantity * c.payingPrice).toFixed(2)}
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
                            <h4>RM {(+total + +shipping).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ cart: state.cart.cart })

export default connect(mapStateToProps)(Cart)