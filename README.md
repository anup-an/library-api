# About the app
This is a full-stack library web application built using React and Django frameworks.

# Table of contents
- [About the app](#about-the-app)
- [Table of contents](#table-of-contents)
  - [About The Project](#about-the-project)
    - [Built With](#built-with)
    - [Application features](#application-features)
      - [General](#general)
      - [Authentication system](#authentication-system)
  - [Getting started](#getting-started)

## About The Project
![Frontpage](client/public/frontpage.png)

### Built With

The main technologies used for building and running the application are listed below:

- [TypeScript](https://www.typescriptlang.org/) - A programming language
- [React](https://react.dev/) - A javascript framework used to build the UI of the application 
- [Chakra UI](https://chakra-ui.com/) - A css framework for building React applications
- [Django](https://www.djangoproject.com/) - A python framework for building web applications
- [Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)  - A software used to build, test, and deploy applications.
- [Nginx](https://www.nginx.com/) - A web server that can be used as a reverse proxy, load balancer, mail cache and HTTP cache.

### Application features
#### General
  - The users can search and filter books based on different criteria.
  - The users can view the details of a book.
  - The users can borrow books if they are logged in.

#### Authentication system
The application has its own login system which is managed in the server using Django session authentication. 

## Getting started
To get the full-stack application running locally follow these steps:
- Clone this repository
- Install docker (https://docs.docker.com/get-docker/)
- Add .env file to the root directory. Add variables included in dev.example file. You may also generate your own secret key for Django app.
- `docker compose build` to build the application in the root folder
- `docker compose up -d` to start the application. The application can be accessed at http://localhost/ or any other address that you have added for NGINX_SERVER in .env file.
- `docker compose down` to close the application



