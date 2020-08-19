import React from 'react'
import { Alert as BSAlert } from 'react-bootstrap'

const Alert = ({ alert, closeAlert }) => {
    const { show, variant, text } = alert

    if (show) {
        return (
            <BSAlert variant={variant}
                onClose={closeAlert}
                dismissible
            >
                {text}
            </BSAlert>
        )
    }

    return (
        <span></span>
    )
}

export default Alert
