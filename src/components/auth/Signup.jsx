import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'

function Signup(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')

    const handleChange = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value)
        }
        if (e.target.id === 'email') {
            setEmail(e.target.value)
        }
        if (e.target.id === 'password') {
            setPassword(e.target.value)
        }
    }

    const useStyles = makeStyles((theme) => ({
        formControl: {
            width: '100%',
            marginBottom: '1rem',
            textAlign: 'left',
        },
    }))

    const handleSignup = async (e) => {
        e.preventDefault()
        if (name === '') {
            alert('Error: Please enter your name.')
            return
        }
        try {
            await firebase.register(name, email, password)
            firebase.addUserType(type)
            props.history.replace('/dashboard')
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert(err + '\nRedirecting you to the login page.')
                props.history.replace('/login')
            } else {
                alert(err)
            }
        }
    }

    const classes = useStyles()
    return (
        <div className="signup">
            <div className="signup__box">
                <h1 className="heading-secondary u-margin-bottom-small">
                    Sign up
                </h1>
                <TextField
                    autoFocus
                    style={{ marginBottom: '1rem', width: '100%' }}
                    variant="outlined"
                    label="Name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                />
                <TextField
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
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">
                        Sign up as
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        label="Sign up as"
                    >
                        <MenuItem value={'student'}>Student</MenuItem>
                        <MenuItem value={'mentor'}>Mentor</MenuItem>
                    </Select>
                </FormControl>
                <a onClick={handleSignup} href="/" className="button--signup">
                    Signup
                </a>
            </div>
        </div>
    )
}

export default withRouter(Signup)
