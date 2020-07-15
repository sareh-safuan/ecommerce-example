import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = ({ children, auth, ...rest }) => {    
    return (
        <Route 
            {...rest}
            render={({ location }) => 
                auth.isUserLogin ? (children)
                : (<Redirect to={{ pathname: '/sign-in', state: { from: location } }} />)
            }
        />
    )
}

const mapStateToProps = (state) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(ProtectedRoute)