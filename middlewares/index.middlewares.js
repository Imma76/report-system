import express from 'express';
import morgan from 'morgan';
import indexRoute from '../routes/index.routes.js';
import database from '../config/db.config.js';
import handleError from './error.middleware.js';
import session from 'express-session';
import cors from 'cors';


const middleware = (app) => {
   
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))
    app.use(cors());
    app.use(morgan());

    app.use(session({resave:false,saveUninitialized:false,secret:'my secret'}))
   
    database()
    app.use(indexRoute);
    app.use(handleError);
}

export default middleware