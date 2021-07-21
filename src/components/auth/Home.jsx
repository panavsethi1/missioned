import React from 'react'
import logo from '../../images/Logo.svg'

function Home() {
    return (
        <div className="home">
            <div className="home__hero">
                <div className="home__hero__box">
                    <div className="home__hero__box__heading u-margin-bottom-small">
                        <img
                            className="home__hero__box__heading__img"
                            src={logo}
                            alt=""
                        />
                        <h1 className="heading-primary">
                            <span className="heading-primary--main">
                                MissionEd
                            </span>
                            <span className="heading-primary--sub">
                                Learn from the best
                            </span>
                        </h1>
                    </div>
                    <div className="home__hero__box__buttons">
                        <a className="button button--white" href="/login">
                            Login
                        </a>
                        <a className="button button--white" href="/signup">
                            Singup
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
