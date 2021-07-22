import React, { useEffect, useState } from 'react'
import firebase from '../firebase'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper/core'
import 'swiper/swiper.scss'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
var youtubeThumbnail = require('youtube-thumbnail')

SwiperCore.use([Autoplay])

function SubjectMenu({ keyword, subject, type }) {
    const [videos, setVideos] = useState([])
    const [windowWidth, setWindowWidth] = useState(1400)

    useEffect(() => {
        firebase.getVideoList(subject).then((res) => {
            setVideos(res.videos)
        })
        setWindowWidth(window.innerWidth)
    }, [subject])

    const searchedVideos = () => {
        return videos.filter(
            (video) =>
                video.title.includes(keyword) ||
                video.description.includes(keyword)
        )
    }

    return searchedVideos().length !== 0 ? (
        <div className="subject-menu">
            <Link to={`/dashboard/${subject}`}>
                <h1 className="heading-subject">{subject}</h1>
            </Link>

            <div>
                <Swiper
                    loop={true}
                    autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
                    spaceBetween={30}
                    slidesPerView={
                        windowWidth > 1200
                            ? 4
                            : windowWidth > 900
                            ? 3
                            : windowWidth > 600
                            ? 2
                            : 1.5
                    }
                >
                    {searchedVideos()
                        .slice(0, 9)
                        .map((vid) => {
                            const thumbnail = youtubeThumbnail(
                                `https://www.youtube.com/watch?v=${vid.src}`
                            ).medium.url
                            return (
                                <>
                                    <SwiperSlide key={vid.src}>
                                        <Link
                                            to={`/dashboard/${subject}/${vid.src}`}
                                        >
                                            <img src={thumbnail} alt=""></img>
                                        </Link>
                                        <p>{vid.title}</p>
                                    </SwiperSlide>
                                </>
                            )
                        })}
                </Swiper>
            </div>
        </div>
    ) : null
}

export default SubjectMenu

// <iframe
//     width="300"
//     height="200"
//     src={`https://www.youtube.com/embed/${vid.src}`}
//     title={vid.title}
//     frameborder="0"
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     allowfullscreen
// ></iframe>
