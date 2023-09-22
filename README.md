This project dedicates to creating a dashboard visulising air quality forecast from deep learning model

The dashboard is built with a simple client-server architecture in web development.

Usage instruction

Both the client and server side of the dashboard utilise Node.js runtime environment. To install Node.js, go to the official website https://nodejs.org. Please download the "Recommended For Most Users" version and install it on your device.
After installation, please check if Node.js is properly installed on your device by typing in the terminal
node --version
If it returns something like v18 or higher then you are good to go!


1. The server side of the dashboard runs on Node.js with the Express.js framework.

To run this application locally, navigate to the server folder in your terminal. Run the command 
npm install
and wait for all dependencies to be downloaded before running 
node ./src/server.js 
which will launch our local server at http://localhost:8000/


2. The client side of the dashboard uses Node.js with the React.js framework.

Initially, navigate to the client folder in your terminal. Run the command 
npm install 
and wait for all dependencies to be downloaded. The node_modules folder is created in the client folder containing all required dependencies for the front-end.

To run this application locally, type 
npm start 
into your terminal window which should open up a new browser tab at http://localhost:3000/ that displays the dashboard. This should take a bit of time!




