const mongoose= require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true,
        unique: true
    },
    collegeId:{
        type:ObjectId,
        require:true,
        ref:"CollageData"
    },
    isDeleted:{
        type:Boolean,
        default : false
    }
})

module.exports = mongoose.model("InternData",internSchema)