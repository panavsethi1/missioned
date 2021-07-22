import React, { useState, useEffect } from 'react'
import './App.css'
import Home from './components/auth/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Dashboard from './components/auth/Dashboard'
import { CircularProgress } from '@material-ui/core'
import firebase from './components/firebase'
import VideoPlayer from './components/dashboard/subjects/VideoPlayer'
import Subject from './components/dashboard/subjects/Subject'

function App() {
    const [isInit, setIsInit] = useState('false')

    useEffect(() => {
        firebase.isInitialized().then((val) => {
            setIsInit(val)
        })
    })

    return isInit !== false ? (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/login" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/dashboard/:subject" exact component={Subject} />
                <Route
                    path="/dashboard/:subject/:id"
                    exact
                    component={VideoPlayer}
                />
            </Switch>
        </Router>
    ) : (
        <div className="loader">
            <CircularProgress />
        </div>
    )
}

export default App
