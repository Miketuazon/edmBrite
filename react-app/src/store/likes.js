
// Declare POJO action type
const LIKE_EVENT = 'likes/getLikes'

// Store - action creators | likes
const likeOneEventAction = (likes) => {
    return {
        type: LIKE_EVENT,
        likes
    }
}

// Store - Thunks | likes
export const likeOneEventThunk = (eventId) => async (dispatch) => {
    console.log("HIT THE getLikesThunk ==========>")
    console.log(eventId)
    const res = await fetch(`/api/likes/events/${eventId}`)
    // console.log("res.json() => ", res.json())
    if (res.ok) {
        const likes = await res.json()
        dispatch(likeOneEventAction(likes))
    }
}

export default function likesReducer(state ={}, action) {
    let newState;
    switch (action.type) {
        case LIKE_EVENT:
            console.log("HIT THE REDUCER LIKE_EVENT ==========>")
            newState = {...state}
            // newState.userLikedList = action.likes.userLikes
            return newState
        default:
            return state;
    }

}
