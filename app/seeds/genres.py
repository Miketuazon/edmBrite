from app.models import db, environment, SCHEMA, Genre
from sqlalchemy.sql import text
import datetime
from random import sample

def seed_genres():
    genre0 = Genre(name="Electronic")
    genre1 = Genre(name="Techno")
    genre2 = Genre(name="Trance")
    genre3 = Genre(name="House")
    genre4 = Genre(name="Dubstep")
    genre5 = Genre(name="Drum and Bass")
    genre6 = Genre(name="Trap")
    genre7 = Genre(name="Disco")
    genre8 = Genre(name="Electro House")
    genre9 = Genre(name="Trap")
    genre10 = Genre(name="Future bass")
    genre11 = Genre(name="Ambient House")
    genre12 = Genre(name="Tech House")
    genre13 = Genre(name="Progressive House")
    genre14 = Genre(name="Deep House")
    genre15 = Genre(name="Progressive Trance")
    genre16 = Genre(name="Hard Trance")
    genre17 = Genre(name="Happy Hardcore")

    db.session.add(genre0)
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
    db.session.add(genre11)
    db.session.add(genre12)
    db.session.add(genre13)
    db.session.add(genre14)
    db.session.add(genre15)
    db.session.add(genre16)
    db.session.add(genre17)
    db.session.commit()

def undo_genres():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM genres"))


    db.session.commit()
