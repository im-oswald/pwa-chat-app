## Chatty _(MEAN Stack App with Websockets)_

Chatty App is a feature-rich messenger application that offers seamless user registration and authentication capabilities. Users can engage in real-time conversations with each other, simulating the experience of instant messaging. The app leverages websockets to provide swift message delivery, ensuring a responsive and engaging chat environment.

[App Demo](https://shorturl.at/swACH)

<img src="./client/src/assets/gifs/demo.gif?raw=true" width="200px">

## Contents

- [Requirements](#-requirements)
- [How to Install dependencies and run](#-how-to-install-dependencies-and-run)

## Requirements

**User Authentication and Profiles:**

- Users must be able to register for an account with a valid email address and password.
- Authentication methods, such as email verification or OAuth, should be implemented for secure access.
- Users should be able to logout from the application safely
- Each user should have a profile that includes a display name and a profile picture which is the initials of name at this point.

**Messaging:**
- Users can send text-based messages to other users.
- Conversations should be organized into chat rooms or one-on-one chats.

**Real-time Chat:**
- Messages should be delivered in real-time to give users an instant messaging experience.
- Notifications or indicators should alert users to new messages.
- These alerts should be different when the chat is already opened vs when it is not
- There should also be a sound for the affirmation of message sent

**Message History:**
- Users should be able to view their chat history, including past messages and conversations.

**Unread Message Count:**
- An unread message count should be displayed to indicate the number of new messages in a conversation.

## Prerequisites

- Angular (angular 15.2.0)
- Node js (version 18 or higher)
- Setup the development environment first.
- [To know more about the MEAN Stack Setup](https://www.javatpoint.com/setup-components-of-mean-stack)

## How to install dependencies and run

- Clone the repository:

```
git clone https://github.com/im-oswald/pwa-chat-app
```

- Go to the project directory:

```
cd pwa-chat-app
```

- Create a new .env file and copy .env.example content to the .env file using:

```
cp -n .env.example .env
```

- Install dependencies:

```
npm install
```

- Go to the client directory and install dependencies there:

```
cd client && npm install && cd ..
```

- Run the servers:

```
npm run start
```

This app is using `concurrently` npm package which will be initiated by the above command and will start the node server at localhost:5000 and the angular server at localhost:4200 by default. You can access the app at http://localhost:4200.
