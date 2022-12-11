import express from 'express';
import indexRoute from '../routes/index.routes.js';
import database from '../config/db.config.js';
import handleError from './error.middleware.js';
import cors from 'cors';

const middleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))
    app.use(cors());
    database()
    app.use(indexRoute);
    app.use(handleError);
}

export default middleware