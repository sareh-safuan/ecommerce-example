import React from 'react'
import {
    Card, CardImage, Image, CardBody, CardTitle, CardFooter, Button, Ul, Li
} from '../../Core.jsx'
import apple from '../../../images/apple.jpg'
import apricot from '../../../images/apricot.jpg'
import banana from '../../../images/banana.jpg'
import guava from '../../../images/guava.jpg'
import honeydew from '../../../images/honeydew.jpg'
import kiwi from '../../../images/kiwi.jpg'
import lemon from '../../../images/lemon.jpg'
import mango from '../../../images/mango.jpg'
// import orange from '../../../images/orange.jpg'
// import papaya from '../../../images/papaya.jpg'
// import pineapple from '../../../images/pineapple.jpg'
// import strawberry from '../../../images/strawberry.jpg'
// import watermelon from '../../../images/watermelon.jpg'

class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            fruits: [
                {
                    image: apple,
                    name: 'Apple',
                    price: 30,
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing.'
                },
                {
                    image: apricot,
                    name: 'Apricot',
                    price: 70,
                    description: 'Lorem ipsum dolor sit amet.'
                },
                {
                    image: guava,
                    name: 'Guava',
                    price: 28,
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit.'
                },
                {
                    image: honeydew,
                    name: 'Honeydew',
                    price: 105,
                    description: 'Lorem ipsum dolor sit amet consectetur.'
                },
                {
                    image: banana,
                    name: 'Banana',
                    price: 18,
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing.'
                },
                {
                    image: kiwi,
                    name: 'Kiwi',
                    price: 88,
                    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
                },
                {
                    image: lemon,
                    name: 'Lemon',
                    price: 57,
                    description: 'Lorem ipsum dolor sit amet consectetur.'
                },
                {
                    image: mango,
                    name: 'Mango',
                    price: 34,
                    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
                }
            ]
        }
    }


    render() {
        const { fruits } = this.state
        return (
            <div className="container">
                <div className="product-list">
                    <FruitList fruits={fruits.slice(0, 4)} />
                </div>
                <div className="product-list">
                    <FruitList fruits={fruits.slice(4, 8)} />
                </div>
                <Paginate />
            </div>
        )
    }
}

const FruitList = ({ fruits }) => {
    return fruits.map((fruit, i) => {
        return (
            <Card css="card-shadow width-20" key={i}>
                <CardImage>
                    <Image src={fruit.image} alt="temporary" />
                </CardImage>
                <CardBody css="product-card-height">
                    <CardTitle>{fruit.name}</CardTitle>
                    <div className="card-text">
                        <p className="product-price">RM {fruit.price}</p>
                        {fruit.description}
                    </div>
                    <CardFooter>
                        <Button
                            css="pure-button-primary"
                            text="Add To Basket"
                            clickHandler={null}
                        />
                    </CardFooter>
                </CardBody>
            </Card>
        )
    })
}

const Paginate = () => {
    return (
        <div className="product-paginate">
            <div>
                <div className="pure-menu pure-menu-horizontal">
                    <Ul>
                        <Li>
                            <a href="/next" style={{ marginRight: '2px' }}>
                                {'<< '}Prev
                            </a>
                        </Li>
                        <Li>
                            <a href="/next" style={{ marginLeft: '2px' }}>
                                Next {' >>'}
                            </a>
                        </Li>
                    </Ul>
                </div>
            </div>
        </div>
    )
}

export default Index