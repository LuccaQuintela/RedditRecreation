# RedditRecreation
Dummy project making a recreation of a reddit-style website simply for practice using Ruby on Rails

Tech Stack: 
 - Ruby on Rails (Backend API mode)
 - React/Typescript (Frontend)
 - Docker (Containerization for Rails backend)

In order to set it up:
- clone repo 
- run `docker compose up -d` to spin up backend container
    - make sure docker is installed and the application is running
    - or if you want to enter the development container through VSCode, simply open the root folder in the IDE and press reopen in container 
- run `npm install` to ensure all package dependencies are installed
- run `npm run dev` to boot up the frontend server
    - make sure npm is installed properly
- go to `localhost:3000` to see the rails backend, endpoints will just result in json outputs
- got to `localhost:5173` to see the front end and get the full web app experience