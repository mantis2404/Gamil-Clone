# GMAIL CLONE  
![image 16](https://github.com/user-attachments/assets/29cf44ab-f22f-47b3-b325-875cc23a2869)

This is a full-stack Gmail-like web application with both frontend and backend components. The backend is built using Node.js, Express, and MongoDB, while the frontend uses HTML, CSS, and JavaScript.

![WhatsApp Image 2025-05-25 at 00 24 52](https://github.com/user-attachments/assets/9210a712-7fe7-4911-914a-d71545f85eaa)

## Here is the demo video of the project which showcases the features like starring, deleting and creating a new mail using Postman

https://github.com/user-attachments/assets/e846ad6d-d732-4eeb-b5f0-aeb020b62f67

---

## Features

- Compose, send, and receive emails
- Save emails to drafts
- Delete and retrieve from trash
- Mark emails as starred or read/unread

## Technologies Used

- Node.js
- Express
- MongoDB (via Mongoose)
- dotenv
- nodemon

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or Atlas)
- `.env` file with required environment variables

### Installation

```bash
git clone https://github.com/mantis2404/Gamil-Clone
cd backend
npm install
```

## Running the Server

1. Navigate to the backend directory:
 ```bash
 cd backend
 ```
   
2. Install dependencies:
  ```bash
  npm install
  ```

3. Start the development server:
  ```bash
  npm run dev
  ```

## Folder Structure

### Backend
```
backend/
├── index.js         # Entry point of the server
    backend/mails/
    ├── model.js         # Mongoose schema for email data
    ├── controller.js    # Logic for handling requests
    └── route.js         # Defines the API endpoints
```
### Frontend
```
frontend/
├── index.html       # Main HTML layout
├── style.css        # Basic styling
└── script.js        # Frontend logic and API calls
```

## Future Of The Project

- Implementing a SMTP server to send mails
- Implementing a IMAP server to recieve mails
