import React from 'react'
// import { Button } from '../../Core.jsx'

import { Switch, Route } from 'react-router-dom'
import Register from './Register.jsx'
import Login from './Login.jsx'

class Main extends React.Component {

    render() {

        return (
            <Wrapper>
                <Switch>
                    <Route path="/sign-in" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </Wrapper>
        )
    }
}

const Wrapper = ({ children }) => {
    return (
        <main>
            <div className="empty-50"></div>
            <div className="row-center">
                {children}
            </div>
            <div className="empty-50"></div>
        </main>
    )
}

export default Main