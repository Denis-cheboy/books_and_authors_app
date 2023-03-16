import { useMutation } from "@apollo/client"
import axios from "axios"
import "./Register.css"
import {useEffect, useState} from "react"
import bot from "../../asserts/botPhoto.jpg"
import { useApp } from "../../context/appContext"
import { REGISTER_AUTHOR } from "../../mutations/ClientMutations"
const Register=()=>{
    const [image,setImage]=useState("")
    const {setCurrentUser}=useApp()
    const [registerAuthor,{loading}]=useMutation(REGISTER_AUTHOR)
    const [registerUser,setRegisterUser]=useState({
        email:"",
        password:"",
        profilePic:"",
        username:"",
        age:""
    })
    const [imagePreview,setImagePreview]=useState(null)
    const [isLoading,setIsloading]=useState(false)
    
    const handleChange=(e)=>{
        setRegisterUser(user=>({...user,[e.target.name]:e.target.value}))
    }
    const addImage=(e)=>{
       const file=e.target.files[0]
       if(file.size>=1048579) alert("File must be less than 1mb")
       setImage(file)
       setImagePreview(URL.createObjectURL(file))
    }

    const uploadImage=async(image)=>{
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","Deno@1")
        try{
          setIsloading(true)
          const res=await axios.post("https://api.cloudinary.com/v1_1/dwzcawi1h/image/upload",data)
          setIsloading(false)
          return res.data.url
        }
        catch(err){
            setIsloading(false)
            console.log(err)
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
           const url=await uploadImage(image)
           const res=await registerAuthor({
            variables:{
                username:registerUser.username,
                password:registerUser.password,
                profilePic:url,
                age:Number(registerUser.age),
                email:registerUser.email
            }
           })
           localStorage.setItem("user",JSON.stringify(res.data.registerAuthor))
        }
        catch(err){
            console.log(err)
        }
    }
   
    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem("user"))
        console.log(data)
        setCurrentUser(data)
    },[])

    return(
        <div className="registerWrapper">
            <div className="registerTitle">Register Here</div>
            <form action="#" className="form" onSubmit={handleSubmit}>
                <div className="registerTop">
                    <img src={imagePreview?imagePreview:bot} alt="user" />
                    <label htmlFor="add">A</label>
                    <input type="file" hidden accept="image/jpg image/jpeg image/png" onChange={addImage} id="add"/>
                </div>
                <label htmlFor="username" className="label">Username</label>
                <br/>
                <input type="text" placeholder="Username" value={registerUser.username} id="username" onChange={handleChange} name="username"/>
                <br/>
                <label htmlFor="email" className="label">email</label>
                <br/>
                <input type="email" placeholder="email" value={registerUser.email} id="email" onChange={handleChange} name="email"/>
                <br/>
                <label htmlFor="password" className="label">password</label>
                <br/>
                <input type="password" placeholder="Password" value={registerUser.password} id="password" onChange={handleChange} name="password"/>
                <br/>
                <label htmlFor="age" className="label">Add Age</label>
                <br/>
                <input type="number" value={registerUser.age} id="age" onChange={handleChange} name="age" placeholder="Age"/>
                <button>{loading?"Registering":"Register"}</button>
            </form>
        </div>

    )
}

export default Register