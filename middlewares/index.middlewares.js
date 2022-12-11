import express from 'express';
import indexRoute from '../routes/index.routes.js';
import database from '../config/db.config.js';
import handleError from './error.middleware.js';

const middleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))
    
    database()
    app.use(indexRoute);
    app.use(handleError);
}

export default middleware