from app.models import db, environment, SCHEMA, Genre
from sqlalchemy.sql import text
import datetime
from random import sample

def seed_genres():
    genre1 = Genre(name="Electronic")
    genre2 = Genre(name="Techno")
    genre3 = Genre(name="Trance")
    genre4 = Genre(name="House")
    genre5 = Genre(name="Dubstep")
    genre6 = Genre(name="Hardstyle")
    genre7 = Genre(name="Trap")
    genre8 = Genre(name="Tech House")
    genre9 = Genre(name="Progressive House")
    genre10 = Genre(name="Future Bass")

    db.session.add(genre1)
    db.session.add(genre2)
    db.session.add(genre3)
    db.session.add(genre4)
    db.session.add(genre5)
    db.session.add(genre6)
    db.session.add(genre7)
    db.session.add(genre8)
    db.session.add(genre9)
    db.session.add(genre10)
    db.session.commit()

def undo_genres():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM genres"))


    db.session.commit()
