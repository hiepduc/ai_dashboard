# Air quality AI forecast visualisation dashboard

This project dedicates to creating a dashboard visulising air quality forecast from deep learning model

The dashboard is built with a simple client-server architecture in web development.

## Install

1. Cloning

The source code needs to be cloned:  `git clone git@bitbucket.org:oehcas/ai_dashboard.git`

2. Install

Then the install itself is done following the instructions written in the README file:

3. Environment

Both client and server side of the dashboard utilise Node.js runtime environment. 

- To install Node.js, go to the official website https://nodejs.org. 
- After installation, check the version with `node –version`, and should be >18 

4. Server

The server side of the dashboard runs on Node.js with the Express.js framework.
- In the server folder, Run `npm install`
- To launch the local server (at http://localhost:8000/), run `node ./src/server.js`

5. Client

The client side of the dashboard uses Node.js with the React.js framework.

- In the the client folder, run `npm install`
- To run this application locally, `npm start` and the visualisation client is accessible at http://localhost:3000/
