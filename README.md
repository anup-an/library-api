# About the app
This is a full-stack library web application built using React and Django frameworks. The application is deployed to digitalocean using digitalocean kubernetes service (DOKS) and the deployment is managed using Terraform. The application can be accessed at https://www.bookslibrary.app .

# Table of contents
- [About the app](#about-the-app)
- [Table of contents](#table-of-contents)
  - [About The Project](#about-the-project)
    - [Built With](#built-with)
    - [Application features](#application-features)
      - [General](#general)
      - [Authentication system](#authentication-system)
  - [Getting started](#getting-started)
      - [Using docker-compose](#using-docker-compose)
      - [Using kubernetes](#using-kubernetes)
  - [CI/CD pipeline](#ci-cd-pipeline)

## About The Project
![Frontpage](client/public/frontpage.png)
![Booklistpage](client/public/booklist.png)


### Built With

The main technologies used for building and running the application are listed below:

- [TypeScript](https://www.typescriptlang.org/) - A programming language
- [React](https://react.dev/) - A javascript framework used to build the UI of the application 
- [Chakra UI](https://chakra-ui.com/) - A css framework for building React applications
- [Django](https://www.djangoproject.com/) - A python framework for building web applications
- [Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)  - A software used to build, test, and deploy applications.
- [Nginx](https://www.nginx.com/) - A web server that can be used as a reverse proxy, load balancer, mail cache and HTTP cache.
- [Kubernetes](https://kubernetes.io/) - An open-source system for automating deployment, scaling, and management of containerized applications.
- [Terraform](https://www.terraform.io/) - An infrastructure as code tool that lets you define both cloud and on-prem resources in human-readable configuration files that you can version, reuse, and share.
- [Jenkins](https://www.jenkins.io/) - A leading open source automation server, Jenkins provides hundreds of plugins to support building, deploying and automating any project.

The data of books is taken from https://www.kaggle.com/datasets/thedevastator/comprehensive-overview-of-52478-goodreads-best-b .

### Application features
#### General
  - The users can view the list of books. The list is paginated.
  - The users can search and filter books based on different criteria.
  - The users can view the details of a book.
  - The users can borrow books if they are logged in.
  - The users can view borrowed books and return them as well.

#### Authentication system
The application has its own login system which is managed in the server using Django session authentication. 

## Getting started
After cloning this repository, you can get the full-stack application running locally using any one of the following ways:
#### Using docker-compose
- Install docker (https://docs.docker.com/get-docker/)
- Add `.env` file to the root directory. Add variables included in `env.example` file to `.env` file. You may also generate your own secret key for Django app.
- `docker compose build` to build the application in the root folder
- `docker compose up -d` to start the application. The application can be accessed at http://localhost/. Make sure than localhost is included in the file `/etc/hosts` in your local machine
- `docker compose down` to close the application
#### Using kubernetes
- Install docker (https://docs.docker.com/get-docker/)
- Install minikube. You can find the instructions here (https://minikube.sigs.k8s.io/docs/start/)
- Start minikube using the following command `minikube start` in the terminal
- Run the following command in your terminal `kubectl apply -f=kubernetes-deployment-local.yaml`
- Run the command in the terminal `minikube tunnel`
- The application can then be accessed at http://localhost/. Make sure than localhost is included in the file `/etc/hosts` in your local machine

## CI CD pipeline
The CI/CD pipelines for frontend and backend are set up locally using minikube, Jenkins and terraform. Each pipeline build an image from the dockerfile in the github repository, pushes the image to dockerhub and updates the respective kuberbetes deployment. The Jenkins server runs in pod inside the cluster. When the pipeline runs in the Jenkins server, it creates a new pod where the pipeline job runs. After job completion the pod gets deleted.

Here are the steps followed to create it
- Install and start minikube
- Using terraform, create all resources in minikube kubernetes cluster neccessary to run the application and Jenkins server. All configurations can be found at `terraform/local` folder in the repository.
- Install kubernetes and docker plugins if not installed through Jenkins UI.
- Also, create github and docker hub credentials through Jenkins UI. These credentials are necessary to access github and dockerhub from Jenkins while running the pipeline job.
- Add neccessary environment variables in Jenkins to be used in the pipeline job created.

You can also create a CI/CD pipeline in your cloud environment adding the terraform configuration for creating Jenkins server and pipelines to your production terraform configuration.




