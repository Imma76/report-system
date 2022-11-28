import express from 'express';
import indexRoute from '../routes/index.routes.js';

const middleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))
    app.use(indexRoute);
}

export default middleware
