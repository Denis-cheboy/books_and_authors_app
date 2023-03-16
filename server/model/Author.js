const mongoose=require("mongoose")

const AuthorSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    profilePic:{
        type:String,
    },
    password:{
        type:String
    },
    age:{
        type:String
    },
    friends:{
        type:[String]
    }
},{timestamps:true})

module.exports=mongoose.model("Author",AuthorSchema)