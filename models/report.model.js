import mongoose from   'mongoose'


const reportSchema = mongoose.Schema({
    name: String,
    anonymous: Boolean,
    regNo: String,
    description: String,
    imageUrl: String,
    videoUrl: String,
    voiceNoteUrl: String,
    password: String,
    phoneNumber: String,
    
    
}, { timeStamps: true })

const reportModel = mongoose.model('Report System', reportSchema);

export default reportModel;