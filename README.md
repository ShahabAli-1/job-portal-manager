## Instructions to run the project

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher) & **npm**: [Download Node.js](https://nodejs.org/)
- **MongoDB:** [Download and install MongoDB](https://www.mongodb.com/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Installation

### 1. Follow these instructions

```bash
git clone https://github.com/ShahabAli-1/job-portal-manager.git
navigate inside the folder where you have cloned the repo:

cd job-portal-manager

### Navigate inside job-portal-backend
cd job-portal-backend
### Run the command to install dependencies
npm install

### Create a .env in the job-portal-backend folder with the following
PORT=5000
MONGO_URI="<your mongo connection string>"
JWT_SECRET=techforing OR <any other secret you want>
CLIENT_URL=http://localhost:5173

### start the server
npm start
OR
npm run dev

### now for client/job-portal-frontend

###navigate in to the job-portal-frontend folder inside the terminal
cd ../job-portal-frontend

### run the command
npm install

### Create a .env in the job-portal-frontend folder with the following
VITE_API_URL=http://localhost:5000/api

### run the command
npm run dev










```
