# Air quality AI forecast visualisation dashboard

This project dedicates to creating a dashboard visulising air quality forecast from deep learning model

The dashboard is built with a simple client-server architecture in web development.

## Installing and running the dashboard

### Cloning

The source code needs to be cloned:  `git clone git@bitbucket.org:oehcas/ai_dashboard.git`

### Install

Then the install itself is done following the instructions written in the README file:

### Environment

Both client and server side of the dashboard utilise Node.js runtime environment. 

- To install Node.js, go to the official website https://nodejs.org. 

- After installation, check the version with `node –version`, and should be >18 

### Server

The server side of the dashboard runs on Node.js with the Express.js framework.

- In the server folder, Run `npm install`

- To launch the local server (at http://localhost:8000/), run `node ./src/server.js`

### Client

The client side of the dashboard uses Node.js with the React.js framework.

- In the the client folder, run `npm install`

- To run this application locally, `npm start` and the visualisation client is accessible at http://localhost:3000/


## DASHBOARD DATA FEED AND RESTART


###	Data feed

The dashboard uses a few data request:

- A data query to DCCEW air quality API (https://data.airquality.nsw.gov.au)

- A data query to purple air api: (https://api.purpleair.com)

- file transfers from SDC, one per model from
`/mnt/scratch_lustre/ar_aichem_scratch/AI_Runs/Forecast/Region/VAR/Additionl_vars/model_name/YYYMMDDHHUTC---tstamp---YYYYMMDD_HHMMSSAEDT/Dashboard/Forecastfilename.csv`

### Restart

Dashboard server is not able to refresh the forecast file list, so a periodic restart is needed (once a day minimum)

