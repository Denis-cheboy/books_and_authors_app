const mongoose=require("mongoose")

const BookSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    genre:{
        type:String
    },
    price:{
        type:Number
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    authorId:{
        type:String
    },
    photo:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("Book",BookSchema)