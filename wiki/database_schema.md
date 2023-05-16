# Database schema



<hr>

## Users Table:

* user_id (integer, primary key)
* username (string)
* email (string)
* password (string)
* first_name (string)
* last_name (string)
* phone_number (string)
* address (string)

<hr>

## Events Table:

* event_id (integer, primary key)
* event_name (string)
* event_summary (string)
* event_description (string)
* event_genre_id (integer, foreign key to Genres table)
* event_start_date (timestamp)
* event_end_date (timestamp)
* event_location (string)
* event_organizer_id (integer, foreign key to Users table)
* event_likes_count (integer)

<hr>

## Tickets Table:

* ticket_id (integer, primary key)
* ticket_type (string)
* ticket_price (decimal)
* ticket_quantity (integer)
* event_id (integer, foreign key to Events table)

<hr>

## Genres Table:

* genre_id (primary key)
* genre_name (string)

<hr>

## Likes Table:

* like_id (integer, primary key)
* user_id (integer, foreign key to Users table)
* event_id (integer, foreign key to Events table)
