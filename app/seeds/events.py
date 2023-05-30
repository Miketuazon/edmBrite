from app.models import db, environment, SCHEMA, Event
from sqlalchemy.sql import text
import datetime
from random import sample
# import random

    # Will implement random later
# def random_date(start, end):
#     return start + datetime.timedelta(
#         seconds=random.randint(0, int((end - start).total_seconds()))
#     )

# start_date = datetime.datetime.now()
# end_date = random_date(start_date, )

# Creating datetime objects
date1 = datetime.datetime.strptime("6/10/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date1 = datetime.datetime.strptime("6/11/2023 02:00am", "%m/%d/%Y %I:%M%p")
date2 = datetime.datetime.strptime("7/15/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date2 = datetime.datetime.strptime("7/16/2023 02:00am", "%m/%d/%Y %I:%M%p")
date3 = datetime.datetime.strptime("5/31/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date3 = datetime.datetime.strptime("6/01/2023 02:00am", "%m/%d/%Y %I:%M%p")
date4 = datetime.datetime.strptime("6/02/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date4 = datetime.datetime.strptime("6/03/2023 02:00am", "%m/%d/%Y %I:%M%p")
date5 = datetime.datetime.strptime("6/09/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date5 = datetime.datetime.strptime("6/10/2023 02:00am", "%m/%d/%Y %I:%M%p")
date6 = datetime.datetime.strptime("6/10/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date6 = datetime.datetime.strptime("6/11/2023 02:00am", "%m/%d/%Y %I:%M%p")
date7 = datetime.datetime.strptime("6/16/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date7 = datetime.datetime.strptime("6/17/2023 02:00am", "%m/%d/%Y %I:%M%p")
date8 = datetime.datetime.strptime("6/17/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date8 = datetime.datetime.strptime("6/18/2023 02:00am", "%m/%d/%Y %I:%M%p")
date9 = datetime.datetime.strptime("6/23/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date9 = datetime.datetime.strptime("6/24/2023 02:00am", "%m/%d/%Y %I:%M%p")
date10 = datetime.datetime.strptime("8/26/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date10 = datetime.datetime.strptime("8/27/2023 02:00am", "%m/%d/%Y %I:%M%p")

def seed_events():
    event1 = Event(
        event_name="Porter Robinson: Worlds Tour",
        event_dj = "Porter Robinson",
        event_summary="Come for a fun time",
        event_preview_image="https://images-na.ssl-images-amazon.com/images/I/61yfgX1PcrL._AC_UL600_SR600,600_.jpg",
        event_description_image="https://i.redd.it/bx958b1kxnv71.jpg",
        event_description="This is Porter's return back to the Brooklyn Mirage! Get your tickets soon as this will sell out!",
        event_genre_id=1,
        event_start_date=date1,
        event_end_date =end_date1,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_venue="Brooklyn Mirage",
        event_street_address="140 Stewart Ave",
        event_city="Brooklyn",
        event_state="New York",
        event_zip_code=11237,
        event_organizer_id=1,
        # user_likes=[2],
    )
    event2 = Event(
        event_name="Tchami x Malaa No Redemption Returns At Echostage",
        event_dj="Tchami",
        event_summary="Are you ready to dance?",
        event_preview_image="https://i1.sndcdn.com/artworks-000326546379-dvvwub-t500x500.jpg",
        event_description_image="https://djmag.com/sites/default/files/styles/djm_23_961x540_jpg/public/article/image/echostage-top-100-Clubs-Winner.jpg",
        event_description="The iconic duo are performing here live! Get your tickets soon as this will sell out!",
        event_genre_id=2,
        event_start_date=date2,
        event_end_date =end_date2,
        event_venue="Echostage",
        event_street_address="2135 Queens Chapel Rd NE",
        event_city="Washington",
        event_state="District of Columbia",
        event_zip_code=20018,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
        # user_likes=[3],
    )
    event3 = Event(
        event_name="Wax Motif: House of Wax",
        event_dj="Wax Motif",
        event_summary="Are you ready to shake that?",
        event_preview_image="https://www.youredm.com/wp-content/uploads/2018/01/wax.jpg",
        event_description_image="https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2022/02/28224545/Academy-LA-Grid.jpg",
        event_description="Wax Motif is back to the heart of LA! Get your tickets soon as this will sell out!",
        event_genre_id=3,
        event_start_date=date2,
        event_end_date =end_date2,
        event_venue="Academy",
        event_street_address="6021 Hollywood Blvd",
        event_city="Los Angeles",
        event_state="California",
        event_zip_code=90028,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=3,
        # user_likes=[1],
    )
    event4 = Event(
        event_name="Armin Van Buuren: ASOT ",
        event_dj="Armin Van Buuren",
        event_summary="Come to witness a Trance legend",
        event_preview_image="https://i0.wp.com/findyoursounds.com/wp-content/uploads/2023/02/Armin-van-Buuren-l-Adscendo-a-Digital-Introduction.jpg",
        event_description_image="https://consciouselectronic.com/wp-content/uploads/2020/02/BassCanyon2019_0823_183546-06124_DIVISUALS-1200x799-1.jpg",
        event_description="Armin Van Buuren comes for a special set at the Gorge! Get your tickets soon as this will sell out!",
        event_genre_id=3,
        event_start_date=date4,
        event_end_date=end_date4,
        event_venue="Gorge Amphitheater",
        event_street_address="754 Silica Rd NW",
        event_city="Quincy",
        event_state="Washington",
        event_zip_code=98848,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
        # user_likes=[1],
    )
    event5 = Event(
        event_name="Charlotte de Witte Presents: A New Beginning",
        event_dj="Charlotte de Witte",
        event_summary="Come listen to the queen of Techno",
        event_preview_image="https://thedjmixtape.com/wp-content/uploads/2023/03/4-3.jpg",
        event_description_image="https://consciouselectronic.com/wp-content/uploads/2021/06/red-rizzles.jpeg",
        event_description="Charlotte de Witte comes for a crazy set at the Gorge! Get your tickets soon as this will sell out!",
        event_genre_id=2,
        event_start_date=date5,
        event_end_date=end_date5,
        event_venue="Red Rocks Amphitheater",
        event_street_address=" 18300 W Alameda Pkwy",
        event_city="Morrison",
        event_state="Colorado",
        event_zip_code=80465,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
        # user_likes=[1],
    )
    event6 = Event(
        event_name="Headhunterz: Art of Hardstyle",
        event_dj="Headhunterz",
        event_summary="Come listen to the one of the best in Hardstyle",
        event_preview_image="https://aoc.pixelstartcdn.com/wp-content/uploads/2019/11/09184353/AOC-Artist-Front-Headhunterz-min.jpg",
        event_description_image="https://cdn.kpbs.org/dims4/default/b623ef3/2147483647/strip/true/crop/1200x675+0+122/resize/1200x675!/quality/90/?url=http%3A%2F%2Fkpbs-brightspot.s3.amazonaws.com%2Fc2%2F12%2Fb13f79494657a6218f71fcea89f6%2Fdvphotovideo2022-0805-225131-2912-as.jpg",
        event_description="Headhunterz comes for a crazy set at the The Caverns in Tennessee! Get your tickets soon as this will sell out!",
        event_genre_id=2,
        event_start_date=date6,
        event_end_date=end_date6,
        event_venue="The Caverns Tennessee",
        event_street_address="555 Charlie Roberts Rd",
        event_city="Pelham",
        event_state="Tennessee",
        event_zip_code=37366,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=3,
        # user_likes=[1],
    )

    event7 = Event(
        event_name="Skrillex Oldschool Set",
        event_dj="Skrillex",
        event_summary="Hear and watch one of the best in Dubstep",
        event_preview_image="https://edm.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_xy_center%2Cq_auto:good%2Cw_1200%2Cx_605%2Cy_1161/MTkzNDI0MjY1ODM0NDA3NDkx/fgr8zsmvqaaurdz.jpg",
        event_description_image="https://cdn.kpbs.org/dims4/default/b623ef3/2147483647/strip/true/crop/1200x675+0+122/resize/1200x675!/quality/90/?url=http%3A%2F%2Fkpbs-brightspot.s3.amazonaws.com%2Fc2%2F12%2Fb13f79494657a6218f71fcea89f6%2Fdvphotovideo2022-0805-225131-2912-as.jpg",
        event_description="Skrillex comes for a once in a blue moon performance! Get your tickets soon as this will sell out!",
        event_genre_id=7,
        event_start_date=date7,
        event_end_date=end_date7,
        event_venue="Hampton Coliseum",
        event_street_address="1000 Coliseum Dr",
        event_city="Hampton",
        event_state="Virginia",
        event_zip_code=23666,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=3,
        # user_likes=[1],
    )
    event8 = Event(
        event_name="Dom Dolla LIVE",
        event_dj="Dom Dolla",
        event_summary="Tech House legend comes to MN.",
        event_preview_image="https://images.squarespace-cdn.com/content/v1/5b5e6d2be74940a00d47f8a0/1660644221766-4CUXA1XE0E58XHDFQ3Z2/220702_DomDolla_MiracleMakerLANDSCAPE_ShevinDissanayake-min.jpg",
        event_description_image="https://img.apmcdn.org/8dfa4c006e6e6e1f0fd043d03cf2a5d0cc00b23c/uncropped/cefc90-20171127-minneapolis-armory.jpg",
        event_description="Dom Dolla is here to stay and only performing one night! Get your tickets soon as this will sell out!",
        event_genre_id=8,
        event_start_date=date8,
        event_end_date=end_date8,
        event_venue="The Armory",
        event_street_address="500 South 6th St",
        event_city="Minneapolis",
        event_state="Minnesota",
        event_zip_code=55415,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=1,
        # user_likes=[1],
    )

    event9 = Event(
        event_name="Martin Garrix: Master of Progressive House",
        event_dj="Martin Garrix",
        event_summary="The one and only Martin Garrix is coming to SF!",
        event_preview_image="https://i.ytimg.com/vi/IVwPWFyC4BU/maxresdefault.jpg",
        event_description_image="https://billgrahamcivic.com/wp-content/uploads/sites/3/2017/09/bgca-jacku.jpg",
        event_description="Garrix is coming. Get your tickets soon as this will sell out!",
        event_genre_id=9,
        event_start_date=date9,
        event_end_date=end_date9,
        event_venue="Bill Graham Civic Auditorium",
        event_street_address="99 Grove St",
        event_city="San Francisco",
        event_state="California",
        event_zip_code=94102,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
        # user_likes=[1],
    )

    event10 = Event(
        event_name="Gareth Emery: Missing You Tour",
        event_dj="Gareth Emery",
        event_summary="The one and only Gareth Emery is coming to SoCal!",
        event_preview_image="https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2023/03/08001316/AtkrXj6mdpdp2eqzbEzyhdDuuu1qZvEOwzd062TK.jpeg",
        event_description_image="https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2022/02/28233555/Nova-SD-972x486-1.jpg",
        event_description="Gareth is coming to San Diego. Get your tickets soon as this will sell out!",
        event_genre_id=3,
        event_start_date=date10,
        event_end_date=end_date10,
        event_venue="NOVA SD",
        event_street_address="454 SIXTH AVE",
        event_city="San Diego",
        event_state="California",
        event_zip_code=92101,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=3,
        # user_likes=[1],
    )
    event11 = Event(
        event_name="Amelie Lens: Presents Exhale",
        event_dj="Amelie Lens",
        event_summary="The one and only Amelie Lens is coming to IL!",
        event_preview_image="https://djtechreviews.com/wp-content/uploads/2022/03/Amelie-Lens-Releases-Ukraine-Fundraiser-Compilation-on-Exhale-Records.jpg",
        # https://amelielens.com/wp-content/uploads/2022/04/Amelie-Lens-1_1-1-500x500.jpg
        event_description_image="https://clubbable.blob.core.windows.net/medias/Tao-Chicago-Chicago",
        event_description="Amelie Lens is coming to Chicago. Get your tickets soon as this will sell out!",
        event_genre_id=2,
        event_start_date=date2,
        event_end_date=end_date2,
        event_venue="Tao Nightclub",
        event_street_address="632 N Dearborn St",
        event_city="Chicago",
        event_state="Illinois",
        event_zip_code=60654,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=1,
        # user_likes=[1],
    )
    event12 = Event(
        event_name="Illenium: Trilogy Tour",
        event_dj="Illenium",
        event_summary="The one and only Martin Garrix is coming to SF!",
        event_preview_image="https://i.ytimg.com/vi/0tYPJ6yqjP4/maxresdefault.jpg",
        event_description_image="https://vegaspublicity.com/wp-content/uploads/2021/07/unnamed-1-1.jpg",
        event_description="Illenium comes to play a never before seen trilogy set. Get your tickets soon as this will sell out!",
        event_genre_id=10,
        event_start_date=date2,
        event_end_date=end_date2,
        event_venue="Allegiant Stadium",
        event_street_address="3333 Al Davis Way",
        event_city="Las Vegas",
        event_state="Nevada",
        event_zip_code=89118,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=1,
        # user_likes=[1],
    )
    # event1.user_likes.append(1)
    db.session.add(event4)
    db.session.add(event5)
    db.session.add(event1)
    db.session.add(event6)
    db.session.add(event7)
    db.session.add(event8)
    db.session.add(event9)
    db.session.add(event11)
    db.session.add(event3)
    db.session.add(event12)
    db.session.add(event2)
    db.session.add(event10)

    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))


    db.session.commit()
