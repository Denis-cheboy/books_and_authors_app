const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const connectDB=require("./dbConnection")
const schema=require("./schema/schema")
const PORT=process.env.PORT || 3500
const {graphqlHTTP}=require("express-graphql")

const app=express()

// database connection
connectDB()

app.use(cors({
    origin:["https://books-and-authors.onrender.com"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/graphql",graphqlHTTP({
    graphiql:true,
    schema:schema
}))

mongoose.connection.once("connected",()=>{
    console.log("Connected to mongoDB")
    app.listen(PORT,()=>console.log("Application running on port",PORT))
})