import React, { useEffect, useState } from 'react'
import firebase from '../firebase'
import SubjectMenu from './SubjectMenu'
import search from '../../images/search.svg'
import { withRouter } from 'react-router-dom'

function StudentDashboard(props) {
    const [subjects, setSubjects] = useState([])
    const [keyword, setKeyword] = useState('')
    const name = firebase.getCurrentUsername()

    useEffect(() => {
        firebase.getSubjectList().then((res) => setSubjects(res))
        return console.log('Cleanup')
    }, [keyword])

    const handleKeyword = (e) => {
        e.preventDefault()
        const key = document.getElementById('search').value
        if (subjects.includes(key)) {
            props.history.replace(`/dashboard/${key}`)
        } else {
            setKeyword(key)
        }
    }

    return (
        <div className="student-dashboard">
            <div className="student-dashboard__hero u-margin-bottom-medium">
                <h1 className="heading-dashboard">
                    <span className="heading-dashboard--main">
                        Hello, {name}
                    </span>
                    <br />
                    <span className="heading-dashboard--sub">
                        What are you learning today?
                    </span>
                    <div className="student-dashboard__hero__search">
                        <input
                            id="search"
                            type="search"
                            placeholder="Search"
                            className="student-dashboard__hero__search__input"
                        ></input>
                        <a href="/" onClick={handleKeyword} alt="">
                            <img
                                className="student-dashboard__hero__search__icon"
                                src={search}
                                alt=""
                            ></img>
                        </a>
                    </div>
                </h1>
            </div>
            <div className="student-dashboard__subjects">
                {subjects.map((sub) => {
                    return (
                        <SubjectMenu
                            key={sub}
                            keyword={keyword.toLowerCase()}
                            subject={sub}
                            type={'student'}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default withRouter(StudentDashboard)
