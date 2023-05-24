// Tickets
// Declare POJO action type
const GET_TICKETS = 'tickets/getTickets'
const CREATE_TICKETS = 'tickets/createTickets'
const BUY_TICKETS = 'tickets/buyTickets'
const GET_BOUGHT_TICKETS = 'tickets/getBoughtTickets'
// Action creators | tickets
const getTicketsAction = (tickets) => {
    return {
        type: GET_TICKETS,
        tickets
    }
}

// const createTicketsAction = (tickets) => {
//     return {
//         type: CREATE_TICKETS,
//         tickets
//     }
// }

// const buyTicketsAction = (tickets) => {
//     return {
//         type: BUY_TICKETS,
//         tickets
//     }
// }

const getBoughtTicketsAction = (tickets) => {
    return {
        type: GET_BOUGHT_TICKETS,
        tickets
    }
}

// Thunks | tickets
// Thunk 1: Get all tickets
export const getTicketsThunk = (eventId) => async (dispatch) => {
    console.log("HIT THE getTicketsThunk ==========>")
    console.log(eventId)
    const res = await fetch(`/api/events/${eventId}/tickets`)

    if (res.ok) {
        const tickets = await res.json()
        dispatch(getTicketsAction(tickets))
    }
}

// Thunk 2: Create tickets
export const createTicketsThunk = (ticketDetails,eventId) => async (dispatch) => {
    console.log("HIT THE createTicketsThunk ==========>")
    // console.log("ticketDetails", ticketDetails)
    // console.log(" create tickets eventId =>",eventId)
    const res = await fetch(`/api/events/${eventId}/tickets/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ticketDetails)
    })

    if (res.ok) {
        const createdTickets = await res.json()
    }
}
// 3. Buy tickets
export const buyTicketsThunk = (purchaseData, eventId) => async (dispatch) => {
    console.log("HIT THE buyTicketsThunk ==========>")
    console.log("purchaseData => ", purchaseData)
    console.log("eventId => ", eventId)
    const res = await fetch(`/api/events/buy_tickets/${eventId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(purchaseData)
    })

    if (res.ok) {
        const boughtTickets = await res.json()
    }
}

// 4. Get bought tickets
export const getBoughtTicketsThunk = () => async (dispatch) => {
    console.log("HIT THE getBoughtTicketsThunk ==========>")

    const res = await fetch(`/api/users/current_user/ticketsOwned`)
    console.log("res => ", res)
    if (res.ok) {
        const tickets = await res.json()
        dispatch(getBoughtTicketsAction(tickets))
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
        case BUY_TICKETS:
            console.log("HIT THE ticketsReducer CREATE_TICKETS ==========>")
            newState = {...state}
            // debugger
            newState[action.boughtTickets] = {...action.tickets}
            return newState
        case GET_BOUGHT_TICKETS:
            console.log("HIT THE ticketsReducer GET_BOUGHT_TICKETS ==========>")
            newState = {...state}
            // debugger
            console.log("newState", newState)
            newState.orders = {...action.tickets}
            console.log("newState after GET_BOUGHT_TICKETS", newState)
            return newState
        default:
            return state
    }
}
