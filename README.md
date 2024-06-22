# Express and Redis Docker Setup Documentation
# Introduction
This project demonstrates how to set up a Node.js application with Express and Redis using Docker Compose. The application includes caching with Redis and rate limiting for incoming requests. This guide will help you understand the setup and run the project locally.

# Prerequisites
1. Docker and Docker Compose installed on your machine
2. Basic knowledge of Node.js, Express, and Redis

# Project Structure
```
├── api
│   └── product.js
├── Dockerfile
├── docker-compose.yml
└── index.js
```

# Files
1.index.js: Main application file for the Express server.
2.api/product.js: Mock function to simulate product fetching.
3.Dockerfile: Docker configuration for the Node.js application.
4.docker-compose.yml: Docker Compose configuration to set up the Node.js application and Redis.

# index.js
This file sets up an Express server with two routes: the home route and a products route. The home route implements rate limiting based on the client's IP address, while the products route fetches and caches product data

# Getting Started
# Clone the Repository
```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

# Build and Run the Application

1. Build and start the services using Docker Compose:
   ```
    docker-compose up --build
   ```
2. The application will be available at http://localhost:3000   
