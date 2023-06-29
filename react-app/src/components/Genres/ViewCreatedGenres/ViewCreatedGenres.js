import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './viewCreatedGenres.css'
// import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { createGenreThunk, getGenresThunk } from "../../../store/genres";

const ViewCreatedGenres = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state?.session?.user)
    const genresObj = useSelector(state => state.genres)
    const genres = Object.values(genresObj)
    useEffect(() => {
        dispatch(getGenresThunk())
    }, [dispatch])

    return (
        <div className="view-genres">
            <section className="user-created-genres">
                <h1>Your created genres</h1>
                    {
                        genres.filter(genre => genre?.user_created === currentUser.id).map(genre =>
                            (
                            <div className="genre-created">
                                <div className="genre-name">{genre.name}</div>
                                <div className="update-delete-buttons">
                                    <div className="update-container">Update</div>
                                    <div className="delete-container">Delete</div>
                                </div>
                            </div>
                        ))
                    }
            </section>
            <section className="view-created-genres">
                <h1>All genres</h1>
                <div className="all-genres-container">
                    {
                        genres.map(genre => (
                            <div>{genre.name}</div>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default ViewCreatedGenres
