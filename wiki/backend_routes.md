# API Routes

- ## /api/auth
- ## /api/events
  - GET /api/events - view all events
  - GET /api/events/<:eventId> - view event by id
  - POST /api/events/<:eventId> - create a new event to site
  - PUT /api/events/<:eventId> - update an event's details
  - DELETE /api/events/<:eventId> - delete a event by id
- ## /api/tickets
  - GET /api/tickets - view your tickets to events
  - GET /api/tickets/<:eventId> - view tickets of one event
  - POST /api/tickets/<:eventId> - create tickets/registration of an event
  - PUT /api/tickets/<:eventId> - update tickets/registration of an event
  - DELETE /api/tickets/<:eventId> - delete tickets/registration of an event
- ## /api/likes
  - GET /api/likes - view your own liked events
  - GET /api/<:eventId>/likes - view likes of an event
  - POST /api/events/<:eventId>/likes - create a like on an event
  - DELETE /api/events/<:eventId>/likes - delete a like on an event

- ## /api/genres
  - GET /api/events/genres/<:genreId> - view events based on a genre
  - GET /api/events/<:eventId>/<:genreId> - view genres of an event
  - POST /api/genres/<:genreId> - create a genre
  - PUT /api/events/<:eventId>/<:genreId> - edit a genre of an event
  - DELETE /api/events/<:eventId>/<:genreId> - delete a genre of an event
- ## /api/users
  - GET /api/users/current - get your user info

## [edmtrain](https://edmtrain.com/api-documentation) Routes
- GET https://edmtrain.com/api/events?client={clientkey} - view all events
- GET https://edmtrain/api/locations?client={clientkey} - view all locations
- GET https://edmtrain/api/events?latitude=40.713&longitude=-74.006&state=New%20York&client={clientkey} - view nearby events (if longitude, latitude, and state is provided)
