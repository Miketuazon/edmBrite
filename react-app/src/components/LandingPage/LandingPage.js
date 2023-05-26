// import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { useSelector } from "react-redux";
import './LandingPage.css'

const LandingPage = () => {
    const history = useHistory()
    const onSubmit = async (e) => {
        e.preventDefault()
        history.push('/events');
    }


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
                    <img src="https://wallpaperset.com/w/full/6/d/e/515404.jpg" alt="intro img" className="intro-image"></img>
                </div>
            </div>
        </>
    )
}

export default LandingPage
