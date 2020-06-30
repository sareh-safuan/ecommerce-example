import React from 'react'
import { Li, Card, CardTitle, CardBody } from '../../Core.jsx'

const orders = [
    {
        id: '#S0YP76PGHYPZEQL2ZNVZ',
        created_at: '2020-05-15 17:20',
        total: 141.00,
        status: 'Delivered',
        fruits: [
            {
                img: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg',
                name: 'Apple (L)',
                quantity: 2,
                price: 30.00
            },
            {
                img: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg',
                name: 'Honey Dew (L)',
                quantity: 1,
                price: 81.00
            }
        ]
    },
    {
        id: '#S0YP76PGHYPZEQL2ZNVZ',
        created_at: '2020-05-15 17:20',
        total: 90.00,
        status: 'Delivered',
        fruits: [
            {
                img: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg',
                name: 'Banana (S)',
                quantity: 5,
                price: 18.00
            }
        ]
    }
]

class Order extends React.Component {
    render() {
        return (
            <Wrapper>
                {
                    orders.map((order, i) => (
                        <Li key={i}>
                            <Card css="card-shadow">
                                <CardBody>
                                    <CardTitle>
                                        <h5>{order.id}</h5>
                                        <small>Order On: {order.created_at}</small>
                                    </CardTitle>
                                    {
                                        order.fruits.map((fruit, j) => (
                                            <div className="row">
                                                <div className="width-10">
                                                    <img src={fruit.img} alt="Not Found" className="img-responsive" />
                                                </div>
                                                <div className="width-90">
                                                    <div style={{ paddingLeft: '10px' }}>
                                                        <div>{`${fruit.name} x ${fruit.quantity}`}</div>
                                                        <div>RM {(fruit.price).toFixed(2)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div class="row-end">
                                        <div>
                                            <div>Total: RM {(order.total).toFixed(2)}</div>
                                            <div>{order.status}</div>
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
        <div className="my-order">
            <div className="pure-menu-list">
                {children}
            </div>
        </div>
    </div>
)

// const Fruit = ({ fruit })

export default Order