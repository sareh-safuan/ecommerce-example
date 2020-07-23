import React from 'react'
import axios from 'axios'
import { Card, CardBody, CardTitle, Li, Button } from '../../Core.jsx'

class Address extends React.Component {
    constructor() {
        super()
        this.state = {
            addresses: []
        }
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId')
        axios({
            method: 'GET',
            url: '/address/' + userId
        })
            .then(res => {
                if (!res.data.success) {
                    throw new Error()
                }

                this.setState({ addresses: res.data.data })
            })
            .catch(err => {
                throw err
            })
    }

    render() {
        const { addresses } = this.state

        return (
            <Wrapper>
                {
                    addresses.map((addr, i) => (
                        <Li key={i}>
                            <Card className="card-shadow">
                                <CardBody>
                                    <CardTitle>
                                        <h4>{addr.tag}</h4>
                                    </CardTitle>
                                    <div>
                                        <p>{addr.address_one}</p>
                                        <p>{addr.address_two}</p>
                                        <p>{addr.city}</p>
                                        <p>{addr.postcode}</p>
                                        <div className="row-space-between">
                                            <p>{addr.state}</p>
                                            <Button
                                                text="Edit"
                                                onClick={null}
                                            />
                                        </div>
                                    </div>

                                </CardBody>
                            </Card>
                        </Li>
                    ))
                }
            </Wrapper>
        )
    }
}

const Wrapper = ({ children }) => (
    <div className="width-80">
        <div className="address">
            <ul className="pure-menu-list">
                {children}
            </ul>
        </div>
    </div>
)

export default Address