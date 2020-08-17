import React from 'react'
import { Alert as BSAlert } from 'react-bootstrap'

const Alert = ({ alert }) => {
    const { show, variant, text } = alert

    if (show) {
        return (
            <BSAlert variant={variant}>
                { text }
            </BSAlert>
        )
    }

    return (
        <span></span>
    )
}

export default Alert
