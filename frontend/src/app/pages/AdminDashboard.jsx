import React from 'react'

const AdminDashboard = ({ showAlert }) => {
    return (
        <button onClick={() => {
            showAlert({
                show: true,
                variant: 'success',
                text: 'Alert is success.'
            })
        }}>
            Raise Alert!
        </button>
    )
}

export default AdminDashboard