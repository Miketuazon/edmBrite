
// Declare POJO action type
const LIKE_EVENT = 'likes/getLikes'
const GET_USER_LIKES = 'likes/userLikes'
const DELETE_LIKE = 'likes/deleteUserLikes'
// Store - action creators | likes
const likeOneEventAction = (likes) => {
    return {
        type: LIKE_EVENT,
        likes
    }
}

const getUserLikesAction = (likes) => {
    return {
        type: GET_USER_LIKES,
        likes
    }
}

const deleteUserLikeAction = (like) => {
    return {
        type: DELETE_LIKE,
        like
    }
}

// Store - Thunks | likes
export const likeOneEventThunk = (eventId) => async (dispatch) => {
    // console.log("HIT THE getLikesThunk ==========>")
    // console.log(eventId)
    const res = await fetch(`/api/likes/events/${eventId}`)
    // console.log("res.json() => ", res.json())
    if (res.ok) {
        const likes = await res.json()
        dispatch(likeOneEventAction(likes))
    }
}

export const getUserLikesThunk = () => async (dispatch) => {
    // console.log("HIT THE getUserLikesThunk ==========>")

    const res = await fetch(`/api/users/current_user/total_likes`)

    if (res.ok) {
        const likes = await res.json()
        dispatch(getUserLikesAction(likes))
    }
}

export const deleteLikeThunk = (eventId) => async (dispatch) => {
    // console.log("HIT THE deleteLikeThunk ==========>")
    // console.log("eventId => ", eventId)
    const res = await fetch(`api/events/${eventId}/likes`, {
        method: 'DELETE'
    })
    // console.log("res => ", res)
    // console.log("res.json() => ", res.json())
    if (res.ok) {
        dispatch(deleteUserLikeAction(eventId))
    }
}

export default function likesReducer(state ={}, action) {
    let newState;
    switch (action.type) {
        case LIKE_EVENT:
            // console.log("HIT THE REDUCER LIKE_EVENT ==========>")
            newState = {...state}
            // newState.userLikedList = action.likes.userLikes
            return newState
        case GET_USER_LIKES:
            // console.log("HIT THE REDUCER GET_USER_LIKES ==========>")
            newState = {...state}
            action.likes.forEach(like => newState[like] = like)
            return newState
        case DELETE_LIKE:
            // console.log("HIT THE REDUCER DELETE_LIKE ==========>")
            newState = {...state}
            delete newState[action.like]
            return newState
        default:
            return state;
    }

}
