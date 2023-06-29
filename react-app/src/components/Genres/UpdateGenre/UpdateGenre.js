import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createTicketsThunk } from "../../../store/tickets"
import { useModal } from "../../../context/Modal"
import "./UpdateGenre.css"
import { updateGenreThunk } from "../../../store/genres"

const UpdateGenreModal = (genre) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state?.session?.user)
    const genresObj = useSelector(state => state.genres)
    const genres = Object.values(genresObj)
    // useEffect(() => {
    //     dispatch(getGenresThunk())
    // }, [dispatch])
    console.log(genre)
    const [name, setName] = useState(genre.genre.name)
    const { closeModal } = useModal()

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const updateName = (e) => setName(e.target.value)


    useEffect(() => {
        let e = {}
        setErrors(e)

        if (genres.includes(name)) e.name = ('Genre name is already made!')
        if (name.length > 40 || name.length < 3) e.name = ('Genre name must be between 3 and 40 characters')

    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.keys(errors).length !== 0) {
            return
        }

        const createdGenre = { name }
        dispatch(updateGenreThunk(createdGenre, genre.genre.id))
        closeModal()
        history.push(`/genres/create`)
    }

    return (
        <div className="create-genre">
            <ul className="errors">
                {hasSubmitted &&
                    Object.entries(errors).map((error, idx) => (
                        <li key={idx} style={{ color: "red", background: "yellow" }}>
                            ERROR!: {error}
                        </li>
                    ))}
            </ul>
            <section className="create-genre-section">
                <form className="create-form" onSubmit={handleSubmit}>
                    <div>
                        <h2><i class="fa-solid fa-music"></i> Didn't see a genre you wanted to include?</h2>
                        <label style={{ "fontWeight": "bold" }} className="input-label">
                            Update your new Genre below!
                            <input style={{ "width": "25%" }}
                                type='text' placeholder='House, Trap, etc.' min='1' maxLength={40}
                                size="40" required value={name} onChange={updateName}
                            />
                            {name.length} / 40
                        </label>
                    </div>
                    <div className="btn-genre">
                        <button className='btn' type="submit">Update genre!</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default UpdateGenreModal
