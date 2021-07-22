import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        if (e.target.id === 'email') {
            setEmail(e.target.value)
        }
        if (e.target.id === 'password') {
            setPassword(e.target.value)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await firebase.login(email, password)
            props.history.replace('/dashboard')
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="signup">
            <div className="signup__box">
                <h1 className="heading-secondary u-margin-bottom-small">
                    Log in
                </h1>
                <TextField
                    autoFocus
                    style={{ marginBottom: '1rem', width: '100%' }}
                    variant="outlined"
                    label="Email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                />
                <TextField
                    type="password"
                    style={{ marginBottom: '1rem', width: '100%' }}
                    variant="outlined"
                    label="Password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                />
                <a onClick={handleLogin} href="/" className="button--signup">
                    Log in
                </a>
            </div>
        </div>
    )
}

export default withRouter(Login)
