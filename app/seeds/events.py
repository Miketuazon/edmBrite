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
date1 = datetime.datetime.strptime("8/10/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date1 = datetime.datetime.strptime("8/11/2023 02:00am", "%m/%d/%Y %I:%M%p")
date2 = datetime.datetime.strptime("7/15/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date2 = datetime.datetime.strptime("7/16/2023 02:00am", "%m/%d/%Y %I:%M%p")
date3 = datetime.datetime.strptime("5/31/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date3 = datetime.datetime.strptime("6/01/2023 02:00am", "%m/%d/%Y %I:%M%p")
date4 = datetime.datetime.strptime("8/02/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date4 = datetime.datetime.strptime("8/03/2023 02:00am", "%m/%d/%Y %I:%M%p")
date5 = datetime.datetime.strptime("8/09/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date5 = datetime.datetime.strptime("8/10/2023 02:00am", "%m/%d/%Y %I:%M%p")
date6 = datetime.datetime.strptime("8/10/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date6 = datetime.datetime.strptime("8/11/2023 02:00am", "%m/%d/%Y %I:%M%p")
date7 = datetime.datetime.strptime("8/16/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date7 = datetime.datetime.strptime("8/17/2023 02:00am", "%m/%d/%Y %I:%M%p")
date8 = datetime.datetime.strptime("8/17/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date8 = datetime.datetime.strptime("8/18/2023 02:00am", "%m/%d/%Y %I:%M%p")
date9 = datetime.datetime.strptime("8/23/2023 10:00pm", "%m/%d/%Y %I:%M%p")
end_date9 = datetime.datetime.strptime("8/24/2023 02:00am", "%m/%d/%Y %I:%M%p")
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
        event_name="Tchami x Malaa: No Redemption",
        event_dj="Tchami",
        event_summary="Are you ready to dance?",
        event_preview_image="https://i1.sndcdn.com/artworks-000326546379-dvvwub-t500x500.jpg",
        event_description_image="https://djmag.com/sites/default/files/styles/djm_23_961x540_jpg/public/article/image/echostage-top-100-Clubs-Winner.jpg",
        event_description="The iconic duo are performing here live! Get your tickets soon as this will sell out!",
        event_genre_id=4,
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
        event_genre_id=4,
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
        event_genre_id=6,
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
        event_description_image="https://edmidentity.com/wp-content/uploads/2019/08/Screen-Shot-2019-08-16-at-8.57.44-PM.png",
        event_description="Skrillex comes for a once in a blue moon performance! Get your tickets soon as this will sell out!",
        event_genre_id=5,
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
    event13 = Event(
        event_name="Afrojack: Forget the World",
        event_dj="Afrojack",
        event_summary="Afrojack live in Las Vegas!",
        event_preview_image="https://magic-ibiza.com/wp-content/uploads/2022/02/afrojack-1200x675.jpg",
        event_description_image="https://www.discotech.me/wp-content/uploads/2014/12/wet_republic_pool.jpg",
        event_description="Don't miss out Afrojack at the pool! Tickets will definitely sell out.",
        event_genre_id=1,
        event_start_date=datetime.datetime.strptime("2023-08-08T16:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2023-08-08T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="Wet Republic",
        event_street_address="3799 S Las Vegas Blvd",
        event_city="Las Vegas",
        event_state="Nevada",
        event_zip_code=89109,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=1,
    )

    event14 = Event(
        event_name="R3hab: The Wave",
        event_dj="R3hab",
        event_summary="R3hab live in Manhattan!",
        event_preview_image="https://weraveyou.com/wp-content/uploads/2021/11/R3hab.jpg",
        event_description_image="https://taogroup.com/wp-content/uploads/2019/09/04_14_18.TwoFriends.Marquee-13-3.jpg",
        event_description="Don't miss out R3hab at one of the best clubs in NYC! Tickets will definitely sell out.",
        event_genre_id=1,
        event_start_date=datetime.datetime.strptime("2023-06-23T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2023-06-24T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="Marquee",
        event_street_address="289 10th Ave",
        event_city="New York",
        event_state="New York",
        event_zip_code=10001,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
    )

    event15 = Event(
        event_name="Carl Cox: Generations",
        event_dj="Carl Cox",
        event_summary="Carl Cox live in Austin!",
        event_preview_image="https://d3vhc53cl8e8km.cloudfront.net/artists/170/IrTtlwPsIH5tlLqWWonPMsbBlWNb2ggeh7XdAMiR.jpeg",
        event_description_image="https://cdn.sanity.io/images/pge26oqu/production/bfb908ff76fe34103038f905322a2bf20292f608-2048x1365.jpg",
        event_description="Don't miss out Carl Cox at one of the best clubs in Austin! Tickets will definitely sell out.",
        event_genre_id=2,
        event_start_date=datetime.datetime.strptime("2023-08-12T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2023-8-13T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="The Concourse Project",
        event_street_address="289 10th Ave",
        event_city="Austin",
        event_state="Texas",
        event_zip_code=78744,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
    )

    event16 = Event(
        event_name="Above & Beyond: Group Therapy",
        event_dj="Above & Beyond",
        event_summary="Above & Beyond live in Boston!",
        event_preview_image="https://i.ytimg.com/vi/n5ZhKyOxZns/maxresdefault.jpg",
        event_description_image="https://mediacdn.cincopa.com/v2/651757/676!S8xCAMY7hDA4MA/4/grand-crowd-1.jpg",
        event_description="Don't miss out Above & Beyond at one of the best venues in Boston! Tickets will definitely sell out.",
        event_genre_id=3,
        event_start_date=datetime.datetime.strptime("2023-08-13T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2023-8-14T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="The Grand Boston",
        event_street_address="58 Seaport Blvd",
        event_city="Boston",
        event_state="Massachusetts",
        event_zip_code=int("02210"),
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=3,
    )

    event17 = Event(
        event_name="Kaskade: Redux",
        event_dj="Kaskade",
        event_summary="Kaskade live in Charlotte!",
        event_preview_image="https://d3nxoulyw7bc8u.cloudfront.net/images/artists/77/fed280cd-6ded-45f6-aaa4-206f2d72d9cb.jpg",
        event_description_image="https://storage.googleapis.com/media.discodonniepresents.com/2022/01/f5c42b6e-2021-1230-charlotte-blackboxtheater-stevenkey-processed-015.jpg",
        event_description="Don't miss out Kaskade with his Redux Set! Tickets are limited, buy them soon!",
        event_genre_id=4,
        event_start_date=datetime.datetime.strptime("2023-10-12T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2023-10-13T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="Black Box Theater",
        event_street_address="421 E Sugar Creek Rd",
        event_city="Charlotte",
        event_state="North Carolina",
        event_zip_code=28212,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
    )

    event18 = Event(
        event_name="Excision: Titans",
        event_dj="Excision",
        event_summary="Excision plays at the Phoenix Raceway!",
        event_preview_image="https://stoneyroads.com/wp-content/uploads/2016/11/excision-the-paradox.jpg",
        event_description_image="https://cdn.relentlessbeats.com/wp-content/uploads/2023/01/Subtronics-@-Phoenix-Raceway-230429-82-960x1200.jpg",
        event_description="Don't miss out on Excision! Tickets are limited, buy them soon!",
        event_genre_id=5,
        event_start_date=datetime.datetime.strptime("2023-09-05T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2023-09-06T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="Phoenix Raceway",
        event_street_address="7602 Jimmie Johnson Dr",
        event_city="Tolleson",
        event_state="Arizona",
        event_zip_code=85353,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=3,
    )

    event19 = Event(
        event_name="Showtek: Dream",
        event_dj="Showtek",
        event_summary="Showtek plays at Club Space!",
        event_preview_image="https://d3nxoulyw7bc8u.cloudfront.net/images/artists/2699/b0aa1d59-0e01-49f7-87f2-ea6a3a9204a1.jpg",
        event_description_image="https://d3nxoulyw7bc8u.cloudfront.net/images/venue/117/9adb4314-8400-4567-9019-737395456e7e.jpg",
        event_description="Don't miss out on Showtek! Tickets are limited, buy them soon!",
        event_genre_id=6,
        event_start_date=datetime.datetime.strptime("2023-07-05T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2023-07-06T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="Club Space",
        event_street_address="34 NE 11th St",
        event_city="Miami",
        event_state="Florida",
        event_zip_code=33132,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
    )

    event20 = Event(
        event_name="RL Grime: Sable Valley",
        event_dj="RL Grime",
        event_summary="RL Grime plays at the Azura Amphitheater!",
        event_preview_image="https://www.billboard.com/wp-content/uploads/media/RL-Grime-press-photo-2018-billboard-1548.jpg",
        event_description_image="https://edm.com/.image/t_share/MTkyMzMyMDY1MDQ2MzQwODQ0/nghtmre_rr20220414_0027.jpg",
        event_description="Don't miss out on RL Grime! Tickets are limited, buy them soon!",
        event_genre_id=7,
        event_start_date=datetime.datetime.strptime("2023-07-15T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2023-07-16T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="Azura Amphitheater",
        event_street_address="633 N 130th St",
        event_city="Bonner Springs",
        event_state="Kansas",
        event_zip_code=33132,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=1,
    )

    event21 = Event(
        event_name="Knock2: Room 202",
        event_dj="Knock2",
        event_summary="Knock2 performs at Exchange LA!",
        event_preview_image="https://i.ytimg.com/vi/SsoogvTYMYk/maxresdefault.jpg",
        event_description_image="https://exchangela.com/wp-content/uploads/2023/03/Concert-Near-Me-1024x512.jpeg",
        event_description="Don't miss out on Knock2! Tickets are limited, buy them soon!",
        event_genre_id=7,
        event_start_date=datetime.datetime.strptime("2023-08-18T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2023-08-19T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="Exchange LA",
        event_street_address="618 S Spring St",
        event_city="Los Angeles",
        event_state="California",
        event_zip_code=90014,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=1,
    )

    event22 = Event(
        event_name="John Summit: Where You Are",
        event_dj="John Summit",
        event_summary="John Summit live at Port of Miami!",
        event_preview_image="https://www.dancemusicnw.com/wp-content/uploads/2018/09/39913580_965917483613691_2598927205216026624_o.jpg",
        event_description_image="https://assets.website-files.com/61ca202c21faec1a3d1b4937/63180de03e880e3b514a5367_WhatsApp%20Image%202022-09-06%20at%2017.23.37.jpeg",
        event_description="Don't miss out on John Summit! Tickets are limited, buy them soon!",
        event_genre_id=8,
        event_start_date=datetime.datetime.strptime("2024-01-24T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2024-01-25T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="Port Of Miami",
        event_street_address="1015 N America Way",
        event_city="Miami",
        event_state="Florida",
        event_zip_code=33132,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
    )

    event23 = Event(
        event_name="Alesso: Forever",
        event_dj="Alesso",
        event_summary="Alesso comes to SF for a great performance!",
        event_preview_image="https://i8.amplience.net/i/naras/alesso_fri_lolla.jpg.jpg?w=821&sm=c",
        event_description_image="https://static.ra.co/images/clubs/lg/midwaysfphoto.jpg?dateUpdated=1455839272740",
        event_description="Don't miss out on Alesso! Tickets are limited, buy them soon!",
        event_genre_id=9,
        event_start_date=datetime.datetime.strptime("2024-07-01T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2024-07-02T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="The Midway",
        event_street_address="1015 N America Way",
        event_city="San Francisco",
        event_state="California",
        event_zip_code=94124,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=3,
    )

    event24 = Event(
        event_name="San Holo: Stay Vibrant",
        event_dj="San Holo",
        event_summary="San Holo comes to Portland for breath-taking performance!",
        event_preview_image="https://www.billboard.com/wp-content/uploads/2021/06/san-holo-cr-haley-lan-2021-billboard-1548-1622756140.jpg",
        event_description_image="https://roselandpdx.com/wp-content/uploads/2021/06/311-Roseland-Theater-8-16-2016-WEB-38-of-68.jpeg",
        event_description="Don't miss out on San Holo! Tickets are limited, buy them soon!",
        event_genre_id=10,
        event_start_date=datetime.datetime.strptime("2024-07-01T20:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_end_date=datetime.datetime.strptime("2024-07-02T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ"),
        event_venue="Roseland Theater",
        event_street_address="8 NW 6th Ave",
        event_city="Portland",
        event_state="Oregon",
        event_zip_code=97209,
        createdAt=datetime.datetime.now(),
        updatedAt=datetime.datetime.now(),
        event_organizer_id=2,
    )

    # event1.user_likes.append(1)
    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.add(event4)
    db.session.add(event5)
    db.session.add(event6)
    db.session.add(event7)
    db.session.add(event8)
    db.session.add(event9)
    db.session.add(event10)
    db.session.add(event11)
    db.session.add(event12)
    db.session.add(event13)
    db.session.add(event14)
    db.session.add(event15)
    db.session.add(event16)
    db.session.add(event17)
    db.session.add(event18)
    db.session.add(event19)
    db.session.add(event20)
    db.session.add(event21)
    db.session.add(event22)
    db.session.add(event23)
    db.session.add(event24)


    db.session.commit()

def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))


    db.session.commit()
