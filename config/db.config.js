import mongoose from "mongoose";

const database = () => {mongoose.connect(process.env.MONGODB_URI).then((value) => console.log('dbb connected')).catch((err) => console.log(err))
}


export default database;