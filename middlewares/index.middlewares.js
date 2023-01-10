import express from 'express';
import morgan from 'morgan';
import indexRoute from '../routes/index.routes.js';
import database from '../config/db.config.js';
import handleError from './error.middleware.js';
import session from 'express-session';
import cors from 'cors';
import MongoDBStore from 'connect-mongodb-session';


const store = new MongoDBStore(session)({uri:process.env.SESSION_URI,collection:'sessions', databaseName: 'Report-System',},function(error) {
    console.log(error)
    // Should have gotten an error
  });

const middleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))
    app.use(cors());
    app.use(morgan());
  //  app.use(session({resave:false,saveUninitialized:false,secret:'my secret',store:store}))
    database();
    app.use(handleError);
    app.use(indexRoute);
   
}

export default middleware