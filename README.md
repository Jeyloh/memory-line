# Memory L|ne

##### Current Status: Hosted on Heroku with Node backend running static React. Connected to Google API and Firebase Auth + Storage

## Remaining work for Release 1
* Handle dates better and sort both personal memories and Google Calendar events from newest to oldes
* Connect to Google Photos API
* Add support for adding images
* Add animations
* Add Icons
* Make it more responsive to Mobile
* Smoothen UI a bit
* Add better PWA support (full caching)

## Concept
Keep all your memories stored in one place. <br>
By logging into your google account you can <br>
add memories to your Timeline based on previous<br>
Calendar events. Get suggestions from Google Photos<br>
for uploading images, or upload your own images.

## Technology used

* React 16 client
* Node 8 server
* Heroku deployment

## I want to try!

Current url is https://memoryline.herokuapp.com/ but domain will be provided when Release 1 is ready.<br>
You can Login with Google with the button there and give permission to Google Calendar. (Later Photos too).<br>
If you Click "Add Memory" and gives it proper data, the memory will be added to your User and displayed like a memory.<br>
When you click "Toggle Calendar" it fetches all your events from gCal and fills the Timeline with them. <br>
If you click one it will be asserted to the "Add Memory" form. Then you can easily add the memory.<br>


## Structure
```
memory-line/
    /client-react
        /src < React source code 
        /public < static files for the React build
        /build < .gitignore
        /firebase-setup < contains setup for firebase on the client, such as login
        package.json < Static client scripts and React dependencies
    /server-node
        /controllers
        /services
        /routes
        /firebase-setup
        package.json
        index.js
    package.json
    storage.rules
    firebase.json
    database.rules.json
```


## Usage
This application is hosted by Heroku and use Firebase features.

The node server is hosting the React apps static files from node-server/index.js.

Because of node hosting front end there is no need to proxy requests from client to server, bcs client is server rendered.

### Scripts

As you can see, the main scripts are in root, which invokes server & client scripts. 

If you want to e.g. only work with the client, either <code>npm run devclient</code> from root or <code>cd client-react && npm start</code>.

For server only development, <code>npm run devserver</code> or <code>cd server-node && npm run dev</code>

To test a production environment, <code>npm start</code> from root whichs builds React and starts the server. 

The React static client is hosted by Node on localhost:5000

```
*/package.json
    "scripts": {
        "start": "cd client-react && npm run build && cd ../server-node && npm run start && cd ..",
        "devclient": "cd client-react && npm run start",
        "devserver": "cd server-node && npm run dev",
        "install-all": "npm install && cd server-node && npm install && cd ../client-react && npm install && cd ..",
        "heroku-postbuild": "cd client-react && npm install && npm install --only=dev --no-shrinkwrap && npm run build && cd .."
    }

*/client-react/package.json
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "echo \"Error: no test specified\" && exit 1"
    }

*/server-node/package.json
    "scripts": {
        "start": "node -r dotenv/config index.js",
        "dev": "nodemon index.js"
    }
```

## - Jeyloh 