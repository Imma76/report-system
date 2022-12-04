import mongoose from   'mongoose'


const userSchema = mongoose.Schema({
    name: String,
    regNo: String,
    imageUrl: String,
    email:String,
    password: String,
    mobile: String,
    
    
}, { timeStamps: true })

userSchema.methods.toJSON = function l() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
}

const userModel = mongoose.model('Users', userSchema);

export default userModel;