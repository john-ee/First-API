# First REST API

## About this project

I'm discovering how to build a full API. I'm currently using mLab to store the data. The end goal is to build a functionnal API that can be extended with a front end. If you have any remarks or questions, feel free to contact me.

## Installation

You need Node JS and a MongoDB. You can use  mLab, explained in the tutorial, or a local MongoDB instance. In any case you need to adapt /db.js

Clone the repository.
```bash
npm install
npm start
```

## First Task : API creation (done)
[Following this tutorial](https://hackernoon.com/restful-api-design-with-node-js-26ccf66eab09)

## Second Task : Explore OneToMany relation (done)

The API will have the following concept : a Device hosts at all time a Software. If a User adds a new Device without an explicit Software available on the DB, a default Software will be added.

## Third Task : Authentication

I followed [this tutorial](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)

A non authenticated user can access the list of Devices and Softwares, but only an authenticated user can add or modify the data, as well as access to user routes. I have a concern with the current implementation on the middleware method, which is repeated on each controllers.
