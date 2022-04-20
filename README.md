# Summary:
A very simple Express Node React application which reads data from a file and displays it in the browser.

# Locations
The React application is built and served from ./client/build.
The express server is run with npm start and is served from ./bin/www
The file that is being read is located at ./resource/data.json (The format is a JSON array and printed with indent=4)

#Setup
1. run `npm install` from the top level
2. run `npm start` to start the server
3. To build the client
   1. `cd client`
   2. `npm install`
   3. `npm run build`

# Workflow
1. Upon opening the application relative route / (http://localhost:3000/), the application immediately requests the data from relative route /api/data (http://localhost:3000/api/data).
2. The response is displayed in a simple HTML table
3. This information is requested by the client at a set interval of 60 seconds.

