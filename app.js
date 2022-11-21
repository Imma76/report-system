import 'express-async-errors';
import express from 'express'
import dotenv from 'dotenv';

dotenv.config()


const app = express();

const PORT =  3200 || process.env.PORT;

app.listen(PORT, () => {
  
    console.log(`port is up and running at ${PORT}`)
})