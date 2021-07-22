import { CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import StudentDashboard from '../dashboard/StudentDashboard'
import firebase from '../firebase'

function Dashboard(props) {
    const [type, setType] = useState('')

    if (
        !sessionStorage[Object.keys(sessionStorage)[0]] &&
        !firebase.getCurrentUsername()
    ) {
        alert("You're logged out.")
        props.history.replace('/login')
        return null
    } else {
        firebase.getCurrentUserType().then(setType)
    }

    const name = firebase.getCurrentUsername()

    const handleLogout = async () => {
        try {
            await firebase.logout()
            props.history.replace('/dashboard')
        } catch (err) {
            console.error(err)
        }
    }

    return type !== '' && name !== '' ? (
        type === 'student' ? (
            <div>
                <StudentDashboard />
            </div>
        ) : (
            <div>Mentor</div>
        )
    ) : (
        <div className="loader">
            <CircularProgress />
        </div>
    )
}

export default withRouter(Dashboard)
