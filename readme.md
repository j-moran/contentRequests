# Content Request

___Note: This site is a work in progress. I am working on getting things running smoothly and without issue, but this is all being done in my free time.___

<p>This is a self-hosted content request system that allows users to request specific types of media in a manner similar to [Ombi](https://ombi.io)</p>

## Requirements
1. Node.JS 
2. MongoDB
3. Goodreads API key
4. GMail account

## Setup
1. Install Node.JS and MongoDB if you haven't already. Make sure that both applications have been added to your PATH.
2. Clone this repo into whichever directory you would like to house this application.
3. Navigate into the newly created folder and run run "npm install" (no quotes). This will install all the necessary odds and ends that make this app work. (For a list of these, look to the bottom of this page.)
4. Open you favorite Command Prompt, Terminal, etc. utility and navigate to the location of the application.
5. Run "npm app.js" in order to start the server. The default port is set to port 80. Changes can be made to this and other settings in the .env file in the root of the app at a later time.

## Installed Node packages
* body-parser
* connect-flash
* dotenv
* ejs
* express
* express-session
* mongoose
* nodemailer
* passport
* passport-local
* passport-local-mongoose
* xml-js

## In Progress
* About Page
* Admin Dashboard
* Invite-Only Registration
* Email communications
* Password Reset