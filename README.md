# README
![test & deploy](https://github.com/amohamed11/hogwash/workflows/test%20&%20deploy/badge.svg?branch=master)  
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c970e2836928418f93cf068b64101259)](https://www.codacy.com/gh/amohamed11/hogwash/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=amohamed11/hogwash&amp;utm_campaign=Badge_Grade)  
A word game based of [balderdash](https://en.wikipedia.org/wiki/Balderdash) but modified for the web.  
Built using Ruby on Rails with ActionCables to manage websockets.  
Frontend is React(Typescript) utilizing [Atlantis](https://atlantis.getjobber.com/) components.  
Hogwash is deployed on a Heroku dyno [here](https://hogwash.fun/).  

# Goals  
- Learn Ruby on Rails
- Practice React & Typescript
- Practice Test-Driven Development
- Utilize CI/CD (using github actions) 
- Learn more about Heroku & its CLI 

# Functionalities
Current design is focused on being functional, things such as animations & transitions may be added at a later point.  
As of now all of the core game flow functions, with few bugs(features) that will be ironed out.
- [x] Create a game  
- [x] Join a game  
- [x] Start game from lobby once players have joined
- [x] Submit answer for word
- [x] Vote on other player's definition  
- [x] Distribute score and then finish round (get next word)  
- [x] Keep track of player scoreboard in the game  
- [x] If correct answer is submitted, go to the next word
- [x] Finish a game & close the lobby  
- [x] Start the game anew with newset of words  
