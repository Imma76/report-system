import mongoose from 'mongoose';


const reportSchema = mongoose.Schema({
    content:{
        type:String,
        required: true,
        
    },
    status:{
        type: String,
        enum:['submitted','inReview','treated']
    },
    userId: {
       type:String,
       ref:'Users'
   },
    imageUrl:{
        type:Array,
        
    },
    voiceNoteUrl: {
        type:Array,
    },
    videoUrl :{
        type:Array
    },


},{timestamps:true} );

const reportModel = mongoose.model('report', reportSchema);

export default reportModel;



