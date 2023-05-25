from flask import Blueprint
from app.models import db, Event
from flask_login import current_user, login_required

like_routes = Blueprint('likes', __name__)

@like_routes.route("/events/<int:event_id>")
@login_required
def like_unlike_event(event_id):
    event = Event.query.get(event_id)
    if not Event:
        return {"errors": "Event does not exist!"}
    current_user_dict = current_user.to_dict()
    liked_events = current_user_dict['events_liked']
    # breakpoint()
    if event.id in liked_events:
        # current_user_dict['events_liked'].remove(event.id)
        event.user_likes.remove(current_user)
        db.session.commit()
        return {
            "message": f"Event {event.id} was un-liked by {current_user_dict['username']}",
            "eventId": event.id,
            "userId": current_user_dict['id']
            }

    # current_user_dict['events_liked'].append(event.id)
    event.user_likes.append(current_user)
    db.session.commit()
    return {
        "message": f"Event {event.id} was liked by {current_user_dict['username']}",
        "eventId": event.id,
        "userId": current_user_dict['id'],
        "userLikes": current_user_dict['events_liked'],
        }
