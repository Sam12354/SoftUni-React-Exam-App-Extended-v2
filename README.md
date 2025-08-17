Since this project utilizes cookies for authentication, you need to create a .env file to store sensitive information, such as the JWT_SECRET. Steps to Set Up the .env File:

Create a .env file in the root directory of the server (if it doesn't already exist).

Add the following environment variable to the .env file:

JWT_SECRET=your_secret_key_here

Replace your_secret_key_here with a strong, secure secret key used for signing JWT tokens and refresh the server.

Ensure that the server is able to read environment variables by using the dotenv package (which should already be included in the server dependencies).


---


🚀 Server Setup

    Navigate to the server directory:

cd server

    Install server dependencies:

npm install

    Start the server:

npm run dev

💻 Client Setup

    Navigate to the client directory:

cd client

    Install client dependencies:

npm install

    Start the client:

npm run dev

🔥 Both server and client run with npm run dev — make sure to start both for full functionality!


---



Live Chat Feature

This project now includes a real-time Live Chat functionality that allows users to communicate instantly while using the app. The chat is fully integrated between the client and server:

    Real-time messaging: Messages are sent and received instantly without page reloads using WebSocket technology.

    User nicknames: Users can set their own nickname for chat identification.

    Persistent chat history: Chat messages are displayed dynamically as users send and receive them.

    Simple and intuitive UI: The chat window can be minimized or expanded easily, keeping the interface clean.

    Seamless integration: The live chat works smoothly alongside the existing app features without interrupting user flow.

This addition enhances the user experience by enabling live interaction and community engagement directly within the app.


---


Core Features

    User Authentication:
    
    Register, Login, Logout
    
    Change password functionality
    
    Form validation with real-time feedback (e.g., fields turn red on incorrect input)
    
    CRUD Operations:
    
    Create, Read, Update, Delete content/items
    
    Fully functional with proper validation and error handling
    
    User Interaction:
    
    Comments and reviews on products
    
    Personalized user space/dashboard to manage products
    
    Live Chat (v2 feature):
    
    Real-time messaging between users using Socket.io
    
    Persistent chat history
    
    Responsive Design:
    
    Works well on desktop and mobile devices
