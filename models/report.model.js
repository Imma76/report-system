import mongoose from 'mongoose';


const reportSchema = mongoose.Schema({
    content:{
        type:String,
        required: true,
        
    },
    name:{
        type:String,
        required: true,
        
    },
    regNo:{
        type:String,
        required: true,
    
    },
    phoneNumber:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    imageUrl:{
        type:Array,
        
    },
    voiceNoteUrl: {
        type:Array,
    },
    videoUrl :{
        type:Array
    }

},{timestamps:true} );

const reportModel = mongoose.model('report', reportSchema);

export default reportModel;



