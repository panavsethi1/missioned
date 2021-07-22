import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import ChatRoom from '../../messaging/ChatRoom'
var youtubeThumbnail = require('youtube-thumbnail')

function Subject(props) {
    const [videos, setVideos] = useState([])
    const subject = props.match.params.subject

    useEffect(() => {
        window.scrollTo(0, 0)
        firebase.getVideoList(subject).then((res) => {
            setVideos(res.videos)
        })
    }, [])

    return (
        <div className="subject">
            <div
                className={`subject__hero subject__hero--${subject} u-margin-bottom-medium`}
            >
                <h1 className="heading-dashboard heading-dashboard--subject">
                    {subject.toUpperCase()}
                </h1>
                <a className={`button button--${subject}`} href="#chat">
                    Subject Chat
                </a>
            </div>
            <div className="subject__content">
                <div className="subject__content__videos">
                    <h1
                        className={`heading-subject heading-subject--${subject} u-margin-bottom-small`}
                    >
                        Videos
                    </h1>

                    <Grid container>
                        {videos.map((vid) => {
                            const thumbnail = youtubeThumbnail(
                                `https://www.youtube.com/watch?v=${vid.src}`
                            ).medium.url
                            return (
                                <Grid
                                    key={vid.src}
                                    item
                                    style={{
                                        textAlign: 'center',
                                        padding: '1rem',
                                    }}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <a
                                        href={`/dashboard/${subject}/${vid.src}`}
                                    >
                                        <img
                                            className="subject__content__videos__thumbnail"
                                            src={thumbnail}
                                            alt=""
                                        ></img>
                                    </a>
                                    <p className="subject__content__videos__title">
                                        {vid.title}
                                    </p>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
                <div id="chat" className="subject__content__chat">
                    <ChatRoom subject={subject} />
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Subject
