# Automation Acceleration Action API
## Suggestion Box

Each ALJ’s employee has some task s.he is doing on a daily basis, therefore reducing their BAU or Project efficiency. The need to target and prioritize which tasks should be on the automation team scope and therefore increase ALJ employees efficiency grows everyday as the company scale up. We are proposing a solution to this issue with the Idea Logger Project.
1. Propose an interface allowing ALJ employees to submit ideas/products/ways of improving their daily work
2. Propose an interface allowing Administrator to review/edit the ideas and easily export them
3. Send reminder to the idea submitter informing her/him of the state of the idea

This APi is related with the Automation Acceleration Action project and connected to the front-end Automation Acceleration Action which is developed in ReactJS.

## Table of Contents

- [How to install](#how-to-install)
- [Run the code](#run-the-code)
- [Folder Structure](#folder-structure)
- [Routes](#pages-and-features)
- [Libraries: used and explanations](#libraries)

## How to install

To launch the project you will need the following in your AXA PC :

- Install [GIT](https://confluence.axa.com/confluence/display/ALJ/Installing+Git+on+Axa+laptop)
- Install [NodeJs](https://confluence.axa.com/confluence/display/ALJ/nodejs)
- Install [VS Code](https://confluence.axa.com/confluence/display/ALJ/VS+code)
- Prerequisite to clone the repository, setup a [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) in your [AXA GitHub profile](https://github.axa.com/settings/tokens).
- Create a .env file with your variables like in [.env.example](./.env.example) file.
- Clone and run the front-end repository: [automation-acceleration-action](https://github.axa.com/aljdevops/automation-acceleration-action)

## Run the code

In the project directory, you can run the following scripts:

### Install the dependencies

`npm install`

Install all the dependencies in the package.json and create a `node_modules/` folder.

### Run the server

`npm start`

Runs the project

`npm run dev`

Runs the project in dev mode (nodemon)

## Folder Structure

The project structure look like this:

```
automation-acceleration-api/
  README.md
  bin/
  database/
  node_modules/
  routes/
  utils/
  package.json --> dependencies and scripts
  app.js --> Express server to serve the app
```

## Routes

The routes are detailed in the [swagger file](https://github.axa.com/aljdevops/automation-acceleration-action-api/blob/master/swagger.yaml).


## Libraries: used and explanations

### Express

HTTP server framework.

### Passport

Authentification middleware for nodeJS.

### Moment

A library to manipulate date and time easily.
