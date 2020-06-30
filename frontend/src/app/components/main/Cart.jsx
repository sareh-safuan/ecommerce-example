import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { Input, BlockInput, Label, Button } from '../../Core.jsx'

class Cart extends React.Component {
    constructor() {
        super()

        this.inputHandler = this.inputHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    inputHandler() { }
    clickHandler() { }
    changeHandler() { }


    render() {
        const { cart } = this.props
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
                                css="width-60"
                                type="email"
                                name="email"
                                changeHandler={this.inputHandler}
                            />
                            <div>
                                <Button
                                    css="pure-button-primary"
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
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="First Name"
                                        css="width-50"
                                        changeHandler={this.inputHandler}
                                        style={{ marginRight: '5px' }}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Last Name"
                                        css="width-50"
                                        changeHandler={this.inputHandler}
                                    />
                                </div>
                                <BlockInput
                                    type="text"
                                    placeholder="Address Line 1"
                                    css="width-100"
                                    changeHandler={this.inputHandler}
                                />
                                <BlockInput
                                    type="text"
                                    placeholder="Address Line 2"
                                    css="width-100"
                                    changeHandler={this.inputHandler}
                                />
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Postal Code"
                                        css="width-30"
                                        changeHandler={this.inputHandler}
                                        style={{ marginRight: '5px' }}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="City"
                                        css="width-70"
                                        changeHandler={this.inputHandler}
                                    />
                                </div>
                                <div className="row">
                                    <div className="width-50">
                                        <Select
                                            name="country"
                                            onChange={this.changeHandler}
                                            styles={selectStyle}
                                        />
                                    </div>
                                    <Input
                                        type="text"
                                        placeholder="Phone Number"
                                        css="width-50"
                                        style={{ marginLeft: '5px' }}
                                    />
                                </div>
                                <div>
                                    <Button
                                        css="pure-button-primary"
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
                                css="width-90"
                                type="text"
                                placeholder="Eg: 5500 0000 0000 0004"
                                changeHandler={this.inputHandler}
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
                                            css="width-40"
                                            type="text"
                                            placeholder="Eg: 2022"
                                            style={{
                                                margin: '0 5px'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="width-20">
                                    <Label htmlFor="cvv" text="CVV" />
                                    <BlockInput
                                        type="text"
                                        css="width-70"
                                        changeHandler={this.inputHandler}
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <Label htmlFor="country" text="Country" />
                                <Select
                                    className="width-90"
                                    onChange={this.changeHandler}
                                    styles={selectStyle}
                                />
                            </div>
                            <div>
                                <Button
                                    text="Pay Now"
                                    css="pure-button-primary"
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
    let shipping = 0
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
                            shipping = (total / (Math.random() * 70)).toFixed(2)
                            return (
                                <div className="row" key={i}>
                                    <div className="width-20">
                                        <img src={c.image} alt="yes" className="img-responsive" />
                                    </div>
                                    <div className="width-50">
                                        <p>{c.name}</p>
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
                            <p>RM {shipping}</p>
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