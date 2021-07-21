import { CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'

function Dashboard(props) {
    const [type, setType] = useState('')

    if (
        !firebase.getCurrentUsername() &&
        !sessionStorage.getItem(
            'firebase:authUser:AIzaSyALCuPpZu8Eua604_hkldobTB9fM1jx7P8:[DEFAULT]'
        )
    ) {
        alert('Error: Please login first.')
        props.history.replace('/login')
        return null
    } else {
        firebase.getCurrentUserType().then(setType)
    }
    const name = firebase.getCurrentUsername()

    return type !== '' && name !== '' ? (
        <div>
            Hi, I'm {name}, a {type}{' '}
        </div>
    ) : (
        <div className="loader">
            <CircularProgress />
        </div>
    )
}

export default withRouter(Dashboard)
