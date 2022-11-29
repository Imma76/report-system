import mongoose from   'mongoose'


const userSchema = mongoose.Schema({
    name: String,
    regNo: String,
    imageUrl: String,
    email:String,
    password: String,
    mobile: String,
    
    
}, { timeStamps: true })

const userModel = mongoose.model('Users', userSchema);

export default userModel;