# Project - Improved Github Analytics
This project is conducted for the course "TWEB-2017", at HEIG-VD, Switzerland.

* Teacher: Olivier Liechti
* Authors: Ludovic Delafontaine & Michela Zucca

## Foreword
This is an improved version of the original Github Analytics project you can find [here](https://heig-vd-tweb2017.github.io/github-analytics-client). The following elements have changed or have been improved:

Client side:

* Use of [Yeoman](http://yeoman.io) to generate the folders structure.
* Use of [Grunt](https://gruntjs.com/) to pack and deploy the application.
* Use of [socket.io](https://socket.io/) to emit new results to the client.
* Use of [AngularJS](https://angularjs.org/) for the frontend.

Server side:

* Use of [Javascript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
* Use of [GraphQL](http://graphql.org/) with the [GitHub API v4](https://developer.github.com/v4/).
* Use of [socket.io](https://socket.io/) to emit new results to the client.
* Use of [MongoDB](https://www.mongodb.com/) to save some results to the database for future usages.
* Use of [Docker Compose](https://docs.docker.com/compose/) to test the infrastructure locally.

More details can be found in the `How is it` section.

## What is this
This project proposes to analyze a GitHub repository, especially on issues management:

* Time analysis of opened issues.
* Time analysis of closed issues.
* Time analysis of the ratio between opened and closed issues.
* Enhancement of the three most active users on opening issues.
* Enhancement of the three most active users on closing issues.
* Enhancement of the number of opened and closed issues.
	
These aspects are represented through graphics and tables.
	
Some information about the users is deliberately hidden: We only show the 15% of the best users in the tables in parts to avoid any competition. The only objective is mutual help and encouragement.
	
## Why is this
We wanted to create this tool to encourage people to improve their product by the following points.

We think that issues are a good measure to the activity and the progress of a project:

* People who open issues want to see bug fixes and/or new features in the product they use. 
* People who close issues fixe bugs and/or add new features to the product they use.

We think that the number of issues opened and the number of issues closed should be very similar. This proves the activity and continuous integration of the product as people want to see new features and people implement them.

## How is this
For this project, we used several librairies and technologies.

Client side:

* [ESLint](https://eslint.org/) for quality code control.
* [socket.io](https://socket.io/) to receive and send from/to the client datas in real time.
* [Moment.js](https://momentjs.com/) to manipulate times in JavaScript.
* [Chart.js](http://www.chartjs.org/) to generate the charts.
* [Yeoman](http://yeoman.io) to generate the folders structure.
* [Grunt](https://gruntjs.com/) to pack and deploy the application.
* [AngularJS](https://angularjs.org/) for the frontend.

Server side:

* [ESLint](https://eslint.org/) for quality code control.
* [Node.js](https://nodejs.org/) for the server runtime engine.
* [Express](http://expressjs.com/) for the WEB server.
* [GitHub API](https://developer.github.com/v4/) to get the data from GitHub.
* [Node-Github-GraphQL](https://www.npmjs.com/package/node-github-graphql) to query the GitHub API v4 from Node.js.
* [socket.io](https://socket.io/) to receive and send from/to the client datas in real time.
* [Moment.js](https://momentjs.com/) to manipulate times in JavaScript.
* [Mocha](https://mochajs.org/) for the unit tests.
* [Chai](http://chaijs.com/) as an assertion library used with Mocha.
* [Docker Compose](https://docs.docker.com/compose/) to deploy and test the application locally.

## Live testing
You can test the entire application [here](https://heig-vd-tweb2017.github.io/improved-github-analytics-client/). Feel free to test it !

## Client's aspects
The client allows the users to query the server using a web interface. He can select the filters he wants to apply for the query that will be sent to our server using socket.io. The server will query GitHub's API and return the results to the client using different socket.io's messages. The data are automatically loaded and the graphics and tables are automatically updated.

## Server's aspects
The server is in charge of retrieving the information from the desired GitHub repository. The server side is broken down in three big parts, the agent, the database and the server:

* The role of the agent: retrieve data about the repo via the GitHub's API. Processing of received data. The data is processed and transmitted as and when to the client who requested the data.
* The role of the database: when the agent has got everything from the API, a copy of the results is saved in the database to send them in the future to compare different results and relative improvements in time.
* The role of the server: intermediary between the agent, the database and the client. It receives the client's request and uses the agent to retrieve the data to be sent back to the client.

## Install, build and tests
You can install all the dependencies by using the following command in the cloned directory:

```
npm install
bower install
brower-installer
```

Then, you can run the application with

```
grunt dev
```

Note: Currently, `grunt build` doesn't work as expected due to a faulty `Gruntfile.js`...

## Deployment

### Local deployment
To test the application locally, just run `grunt dev`.

A web server will be created, a webpage opened and you will be able to test the application locally.