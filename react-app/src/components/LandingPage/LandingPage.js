import { useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
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
                <h1>Hi there!</h1>
                <h2>Welcome to</h2>
                <img src="https://imgur.com/TbXlJSk.png"></img>
            </div>
            <button className='check-out-events' onClick={onSubmit}>
                Check out events!
            </button>
        </>
    )
}

export default LandingPage
