// Declare POJO action creator
const GET_GENRES = 'genres/getGenres'
const CREATE_GENRE = 'genres/createGenre'
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
        default:
            return state
    }
}
