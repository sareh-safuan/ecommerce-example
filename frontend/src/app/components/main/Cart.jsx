import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import validate from 'validate.js'
import constraint from '../../controllers/constraint.js'
import { Input, BlockInput, Label, Button } from '../../Core.jsx'

class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            email: { field: '', error: '' },
            first_name: { field: '', error: '' },
            last_name: { field: '', error: '' },
            address_one: { field: '', error: '' },
            address_two: { field: '', error: '' },
            postal_code: { field: '', error: '' },
            city: { field: '', error: '' },
            country: { field: '', error: '' },
            phone_number: { field: '', error: '' },
            credit_card: { field: '', error: '' },
            expiry_year: { field: '', error: '' },
            cvv: { field: '', error: '' }
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
            email, first_name, last_name, address_one, address_two, postal_code,
            city, country, phone_number, credit_card, expiry_year, cvv
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

        if (!cart.length) {
            return <h4>Your cart is empty</h4>
        }

        return (
            <Wrapper>
                <Checkout>
                    <List header="1) Customer">
                        <div className="checkout-step-body">
                            <p>Continue as guest?</p>
                            <Label htmlFor="email" text="Email Address:" />
                            <BlockInput
                                className="width-100"
                                type="email"
                                name="email"
                                field={email}
                                inputHandler={this.inputHandler}
                            />
                            <div>
                                <Button
                                    className="pure-button-primary"
                                    text="Continue"
                                    clickHandler={this.clickHandler}
                                    style={{
                                        marginTop: '5px'
                                    }}
                                />
                            </div>
                            <p>Already have account?
                                <Link to="/sign-in">Sign in now</Link>
                            </p>
                        </div>
                    </List>
                    <List header="2) Shipping">
                        <div className="checkout-step-body">
                            <div>
                                <div className="row">
                                    <div className="width-60">
                                        <BlockInput
                                            type="text"
                                            name="first_name"
                                            placeholder="First Name"
                                            className="width-100"
                                            field={first_name}
                                            inputHandler={this.inputHandler}
                                        />
                                    </div>
                                    <div className="width-60">
                                        <BlockInput
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name"
                                            className="width-100"
                                            field={last_name}
                                            inputHandler={this.inputHandler}
                                        />
                                    </div>
                                </div>
                                <BlockInput
                                    type="text"
                                    name="address_one"
                                    placeholder="Address Line 1"
                                    className="width-100"
                                    field={address_one}
                                    inputHandler={this.inputHandler}
                                />
                                <BlockInput
                                    type="text"
                                    name="address_two"
                                    placeholder="Address Line 2"
                                    className="width-100"
                                    field={address_two}
                                    inputHandler={this.inputHandler}
                                />
                                <div className="row">
                                    <div className="width-40">
                                        <BlockInput
                                            type="text"
                                            name="postal_code"
                                            placeholder="Postal Code"
                                            className="width-100"
                                            field={postal_code}
                                            inputHandler={this.inputHandler}
                                        />
                                    </div>
                                    <div className="width-70">
                                        <BlockInput
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            className="width-100"
                                            field={city}
                                            inputHandler={this.inputHandler}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="width-50">
                                        <Select
                                            name="country"
                                            onChange={this.changeHandler}
                                            styles={selectStyle}
                                        />
                                    </div>
                                    <div className="width-50">
                                        <BlockInput
                                            type="text"
                                            name="phone_number"
                                            placeholder="Phone Number"
                                            className="width-100"
                                            field={phone_number}
                                            inputHandler={this.inputHandler}
                                            style={{ marginLeft: '5px' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        className="pure-button-primary"
                                        text="Continue"
                                        clickHandler={this.clickHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </List>
                    <List header="3) Payment">
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
                                <div className="width-70">
                                    <Label htmlFor="country" text="Expiry Date" />
                                    <div className="row">
                                        <div className="width-60">
                                            <Select
                                                onChange={this.changeHandler}
                                                styles={selectStyle}
                                            />
                                        </div>
                                        <Input
                                            className="width-40"
                                            type="text"
                                            name="expiry_year"
                                            field={expiry_year}
                                            placeholder="Eg: 2022"
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