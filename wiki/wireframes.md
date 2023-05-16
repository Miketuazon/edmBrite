# Wireframes
## Landing page
![Landing page](https://imgur.com/SZywVew.png)
- Nav bar on top
- Splash images
- Example events below splash image
## Navigation bar
![](https://imgur.com/XKLsfsU.png)
### Left Side
- edmBrite logo
- Search bar

### Right side
- Create an event button
- Likes button
  - Link to my likes
- Tickets button
  - Link to my attending events
- User image and email with dropdown icon
  - Dropdown hover modal on email/ user image

## Dropdown menu
![](https://imgur.com/uGfJOkn.png)
- ### Browse Events
  - Go back to feed of events
- ### Manage my Events
  - Go to my events page
- ### Tickets
  - Go to events attending page
- ### Liked
  - Go to my liked events page
- ### Account Settings
  - /*may not be implemented*/

## Events page
![Events page](https://imgur.com/LBgt5Zl.png)
- ### Popular in USA
  - If time allows, will change to be able to search location
- ### Genre selection
  - Can do all, and different genres of EDM (house, bass, trance, techno, dubstep, drum and bass, trap, hardstyle,  )
  - Depending on which is clicked, it will show events that have that genre
## Create event page (pre page, steps 1-5)
![](https://imgur.com/EIoVvgc.png)
![](https://imgur.com/vjsdhpW.png)
![](https://imgur.com/veKEAMI.png)
![](https://imgur.com/iTHUhSE.png)
![](https://imgur.com/PKZxGXU.png)
![](https://imgur.com/N4GoUO0.png)
- If time allows, create a pre-page and questions if user is creating an event for the first time

## Create event form pages 1-3
### (Basic info, pt 1)
![](https://imgur.com/GCVHFEa.png)
- ### Basic Info
  - Event info Input box (description) REQ
  - Organizer (can be current_user_id)
  - Category will be genres instead
  - Tags may not be implemented

## (Location/Date time, pt 2)

![](https://imgur.com/Ur9V8I2.png)
- ### Location
  - Venue / TBA
  - Street address
  - City
  - Country
  - State
  - Zip
  - Country

![](https://imgur.com/hEJmVDz.png)
- ### Date and time
  - May just input single event or remove it
  - Event Start date and time
  - Event end date and time
  - Start and end time will be defaulted to always
  - Time Zone dropdown of time zones
  - Language will be set to english


## (Images, video, summary, pt 3)
![](https://imgur.com/PIvJJTN.png)
- ### Images
  - Upload image for event
  - Video url may not be implemented
  - Image can be null

## (Summary, description, add more sections, pt 4)
![](https://imgur.com/Z9qA3Cr.png)
- ### Summary
  - Can be null. Short summary 140 characters max

- Description of event (140 max)
  - Description of the event
## Create tickets/registration
### Create tickets for event page
![](https://imgur.com/DdX8rA6.png)
- ### Section
  - Might not implement this if time allows. GA/VIP
- ### Add tickets
  - Button will bring up tickets modal to right side
- ### Paid and free options for now
### Add tickets modal (paid)
![](https://imgur.com/AM90Xou.png)
- Paid is selected
- Name of type of ticket
- Quantity
- Price
- Sales start/end time might be omitted
- Advanced settings may be omitted
## Add tickets modal (free)
![](https://imgur.com/Ds6NTeP.png)
- Free is selected
- Name of type of ticket
- Quantity
- Price IS SET TO 0
- Sales start/end time might be omitted
- Advanced settings may be omitted
## Event Details and ticket button
![](https://imgur.com/hKgFIlB.png)
- ## Image centered on top
- ## Left side
  - Date
  - Title
  - Summary
  - Event owner
  - When and where
    - Date/time | Location
- ## Right side
  - Tickets div
    - Price
    - Get tickets Button
    - Note: position always sticky
## Description
- ### About this event
- ### Time | Type of ticket
- Length of event | Type of ticket
- Photo of venue
- Description of event
- Tickets box is still sticky top right
## My events page
![](https://imgur.com/aLHhQZj.png)
- Events you are the owner of
- List of events
  - Event
  - Date, img, name, address, sold #, Status
## Search for events
![](https://imgur.com/SwpoQg8.png)
- Filters
  - Left side
- Events
  - Middle left
- Map
  - Implementation of Google Maps and edmtrain

## My tickets page
![](https://imgur.com/XGY8XIV.png)
- Tickets page of events that the user has
