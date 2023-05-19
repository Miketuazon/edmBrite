// Declare POJO action creator
const GET_GENRES = 'genres/getGenres'

// Store - action creators | genres
const getGenresAction = (genres) => {
    return {
        type: GET_GENRES,
        genres
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

export default function genresReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_GENRES:
            newState = {...state}
            action.genres.map((genre) => newState[genre.id] = genre)
            return newState
        default:
            return state
    }
}
