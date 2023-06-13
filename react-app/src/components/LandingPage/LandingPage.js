// import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './LandingPage.css'
import { getEventsThunk } from "../../store/events";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const LandingPage = () => {
    const dispatch = useDispatch()
    const eventsObj = useSelector(state => state.events)
    const events = Object.values(eventsObj)
    const history = useHistory()
    const onSubmit = async (e) => {
        e.preventDefault()
        history.push('/events');
    }


    useEffect(() => {
        dispatch(getEventsThunk())
    }, [dispatch])


    return (
        <>
            <div className='intro'>
                <div className="left-intro">
                    {/* <img alt='logo' src="https://i.imgur.com/wcU7Hmm.png"></img> */}
                    <h1>edmBrite</h1>
                    <h2>Get lost in the music</h2>
                    {/* <h2>Welcome to</h2> */}
                    <h2 className="question"></h2>
                    <button className='check-out-events' onClick={onSubmit}>
                        Find your next event
                    </button>
                </div>
                <div className="right-intro">
                    {/* <img src="https://wallpaperset.com/w/full/6/d/e/515404.jpg" alt="intro img" className="intro-image"></img> */}
                    <div className="carousel-container">
                        <Carousel autoPlay infiniteLoop showThumbs={false} interval={3000} className="carousel-selector">
                            {
                                events.map((e, index) => (
                                    <div key={index} className="image-container-landing">
                                        <img className="" src={e.event_description_image} alt={`Slide ${index + 1}`} style={{"height": "60vh", "objectFit": "contain"}} ></img>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage
