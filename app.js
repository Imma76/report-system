import 'express-async-errors';
import express from 'express';

import dotenv from 'dotenv';
import middleware from './middlewares/index.middlewares.js';
import session from 'express-session';


dotenv.config()


const app = express();
middleware(app)



const PORT =  3200 || process.env.PORT;

app.listen(PORT, () => {
  
    console.log(`port is up and running at ${PORT}`)
})