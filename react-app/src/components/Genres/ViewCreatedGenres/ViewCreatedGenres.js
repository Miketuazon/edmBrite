import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './viewCreatedGenres.css'
// import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { createGenreThunk, getGenresThunk } from "../../../store/genres";
import OpenModalButton from "../../OpenModalButton";
import UpdateGenreModal from "../UpdateGenre/UpdateGenre";
import DeleteGenreModal from "../DeleteGenreModal/DeleteGenreModal";
import OpenModalDelete from "../../Events/OwnedEvents/OpenModalDelete";

const ViewCreatedGenres = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state?.session?.user)
    const genresObj = useSelector(state => state.genres)
    const genres = Object.values(genresObj)
    useEffect(() => {
        dispatch(getGenresThunk())
    }, [dispatch])

    const userCreatedGenres = genres.filter(genre => genre?.user_created === currentUser.id)

    return (
        <div className="view-genres">
            <h2 style={{ "paddingLeft": "1%" }}>Your created genres</h2>
            <section className="user-created-genres" style={{ "paddingLeft": "1%" }}>
                {
                    userCreatedGenres.length ? userCreatedGenres.map(genre =>
                    (
                        <div className="genre-created">
                            <div className="genre-name">{genre.name}</div>
                            <div className="update-delete-container">
                                <div className="update-container">
                                    <OpenModalButton className="update-genre-button"
                                        modalComponent={<UpdateGenreModal genre={genre} />}
                                        buttonText={'Update'}
                                    />
                                </div>
                                <div className="delete-container">
                                    <button className="delete-button">
                                        <OpenModalDelete
                                            itemText='Delete'
                                            modalComponent={<DeleteGenreModal genre={genre}
                                            />}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                        :
                        <div className="no-genres">
                            <div>Oh no, you don't have any created genres.</div>
                            <div>Create a genre above!</div>
                        </div>
                }
            </section>
            <section className="view-created-genres" style={{ "paddingLeft": "1%" }}>
                <h1>All genres</h1>
                <div className="all-genres-container">
                    {
                        genres.map(genre => (
                            <div className="genre-container">
                                <div className="genre-name">{genre.name}</div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default ViewCreatedGenres
