// Declare POJO action creator
const GET_GENRES = 'genres/getGenres'
const CREATE_GENRE = 'genres/createGenre'
const UPDATE_GENRE = 'genres/updateGenre'

// Store - action creators | genres
const getGenresAction = (genres) => {
    return {
        type: GET_GENRES,
        genres
    }
}

const createGenreAction = (genre) => {
    return {
        type: CREATE_GENRE,
        genre
    }
}

const updateGenreAction = (genre) => {
    return {
        type: UPDATE_GENRE,
        genre
    }
}

// Store - Thunks | genres
// Thunk 1: Get all genres
export const getGenresThunk = () => async (dispatch) => {
    const res = await fetch('/api/genres')
    if (res.ok) {
        const genres = await res.json()
        dispatch(getGenresAction(genres))
    }
}

// Thunk 2: Create a genre
export const createGenreThunk = (genreDetails) => async (dispatch) => {
    const res = await fetch(`/api/genres/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genreDetails)
    })
    if (res.ok) {
        const createdGenre = await res.json();
        return createdGenre;
    }
}

// Thunk 3: Update genre
export const updateGenreThunk = (genreDetails, genreId) => async (dispatch) => {
    console.log(genreId, genreDetails)
    const res = await fetch(`/api/genres/${genreId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genreDetails)
    })

    if (res.ok) {
        const editedGenre = await res.json()
        dispatch(updateGenreAction(editedGenre))
        return res
    }
}
export default function genresReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_GENRES:
            newState = { ...state }
            action.genres.map((genre) => newState[genre.id] = genre)
            return newState
        case CREATE_GENRE:
            newState = { ...state }
            newState[action.genre.id] = action.genre
            return newState
        case UPDATE_GENRE:
            newState = {...state}
            newState[action.genre.genre.id] = action.genre.genre
            return newState
        default:
            return state
    }
}
