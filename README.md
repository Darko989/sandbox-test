# sandbox-test

SANDBOX TEST PROJECT
===========================

Installation
------------

[TODO]

First clone repo from the github repositorium to the local machine.

### Cypress install

macOS 10.9 and above (64-bit only)
Linux Ubuntu 12.04 and above, Fedora 21 and Debian 8 (64-bit only)
Windows 7 and above
Node.js

Install Cypress via npm:

cd /your/project/path
npm install cypress --save-dev

Installing Cypress via yarn:

cd /your/project/path
yarn add cypress --dev

### Installing chai json pattern for running the commands

$ npm i chai-json-pattern to your project

### Opening cypress.io 

cd /your/project/path
npx cypress open


cd /your/project/path
yarn run cypress open

### Running the tests

After cypress is up find UI and API test and just by clicking, tests are running

use this command to run entire tests

npx cypress run cypress/integration/api/**/*

npx cypress run cypress/integration/ui/**/*


