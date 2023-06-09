from flask import Blueprint
from app.models import db, Event
from flask_login import current_user, login_required
from .user_routes import user_routes
from .event_routes import event_routes
from ..models import User

like_routes = Blueprint('likes', __name__)

@like_routes.route("/events/<int:event_id>")
@login_required
def like_unlike_event(event_id):
    event = Event.query.get(event_id)
    if not Event:
        return {"errors": "Event does not exist!"}
    current_user_dict = current_user.to_dict()
    # liked_events = current_user_dict['events_liked']
    # # breakpoint()
    # if event.id in liked_events:
    #     # current_user_dict['events_liked'].remove(event.id)
    #     event.user_likes.remove(current_user)
    #     db.session.commit()
    #     return {
    #         "message": f"Event {event.id} was un-liked by {current_user_dict['username']}",
    #         "eventId": event.id,
    #         "userId": current_user_dict['id']
    #         }

    # current_user_dict['events_liked'].append(event.id)
    event.user_likes.append(current_user)
    db.session.commit()
    return {
        "message": f"Event {event.id} was liked by {current_user_dict['username']}",
        "eventId": event.id,
        "userId": current_user_dict['id'],
        "userLikes": current_user_dict['events_liked'],
        }

@user_routes.route("/current_user/total_likes")
@login_required
def get_likes():
    """
    Query to get all user likes
    """
    current_user_dict = current_user.to_dict()
    liked_events = current_user_dict['events_liked']
    return liked_events

@event_routes.route("/<int:event_id>/likes", methods=["DELETE"])
@login_required
def delete_like(event_id):
    """
    Query to delete a user's like
    """
    event = Event.query.get(event_id)
    if not Event:
        return {"errors": "Event does not exist!"}
    current_user_dict = current_user.to_dict()
    liked_events = current_user_dict['events_liked']
    if event.id in liked_events:
        # current_user_dict['events_liked'].remove(event.id)
        event.user_likes.remove(current_user)
        db.session.commit()
        return {
            "message": f"Event {event.id} was un-liked by {current_user_dict['username']}",
            "eventId": event.id,
            "userId": current_user_dict['id'],
            }
