import React from 'react'
import axios from 'axios'
import { Card, CardBody, CardTitle, Li, Button } from '../../Core.jsx'

const add = [
    {
        tag: 'Home Address',
        firstAddressLine: 'Lot 89 Jalan Enggang Ampang/Ulu Industrial Estate',
        secondAddressLine: '',
        city: 'Klang',
        postcode: '54200',
        state: 'Selangor Darul Ehsan'
    },
    {
        tag: 'Office Address',
        firstAddressLine: 'Suite 12A-2-1 Menara Pan Global 8 Lorong P Ramlee',
        secondAddressLine: 'Jalan Stesen Utama',
        city: 'Setapak, Kuala Lumpur',
        postcode: '50250',
        state: 'Wilayah Persekutuan'
    }
]

class Address extends React.Component {

    componentDidMount() {
        const userId = localStorage.getItem('userId')
        axios({
            method: 'GET',
            url: '/address/' + userId
        })
            .then(res => {
                console.log(res)
                // console.log()
            })
            .catch(err => {
                throw err
            })
    }

    render() {
        return (
            <Wrapper>
                {
                    add.map((a, i) => (
                        <Li key={i}>
                            <Card css="card-shadow">
                                <CardBody>
                                    <CardTitle>
                                        <h4>{a.tag}</h4>
                                    </CardTitle>
                                    <div>
                                        <p>{a.firstAddressLine}</p>
                                        <p>{a.secondAddressLine}</p>
                                        <p>{a.city}</p>
                                        <p>{a.postcode}</p>
                                        <p>{a.state}</p>
                                    </div>
                                    <div className="row-end">
                                        <Button
                                            text="Edit"
                                            onClick={null}
                                        />
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