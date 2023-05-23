// Tickets
// Declare POJO action type
const GET_TICKETS = 'tickets/getTickets'
const CREATE_TICKETS = 'tickets/createTickets'
// Action creators | tickets
const getTicketsAction = (tickets) => {
    return {
        type: GET_TICKETS,
        tickets
    }
}

const createTicketsAction = (tickets) => {
    return {
        type: CREATE_TICKETS,
        tickets
    }
}

// Thunks | tickets
// Thunk 1: Get all tickets
export const getTicketsThunk = (eventId) => async (dispatch) => {
    console.log("HIT THE getTicketsThunk ==========>")
    console.log(eventId)
    const res = await fetch(`/api/events/${eventId}/tickets`)
    // console.log("res of getTicketsThunk => ", res.json())

    if (res.ok) {
        const tickets = await res.json()
        dispatch(getTicketsAction(tickets))
    }
}

// Thunk 2: Create tickets
export const createTicketsThunk = (ticketDetails,eventId) => async (dispatch) => {
    console.log("HIT THE getTicketsThunk ==========>")
    console.log("ticketDetails", ticketDetails)
    console.log(" create tickets eventId =>",eventId)
    const res = await fetch(`/api/events/${eventId}/tickets/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ticketDetails)
    })
    console.log("res here =>", res.json())

    if (res.ok) {
        const createdTickets = await res.json()
        return createdTickets
    }
}

// reducer
export default function ticketsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_TICKETS:
            console.log("HIT THE ticketsReducer GET_TICKETS ==========>")
            newState = {...state}
            newState.ticketsOfEvent = {...action.tickets}
            return newState
        case CREATE_TICKETS:
            console.log("HIT THE ticketsReducer CREATE_TICKETS ==========>")
            // debugger
            newState = {...state}
            newState[action.ticketsOfEvent] = {...action.tickets}
            return newState
        default:
            return state
    }
}
