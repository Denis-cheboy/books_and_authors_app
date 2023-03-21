import { useMutation } from "@apollo/client"
import axios from "axios"
import "./Register.css"
import { useState} from "react"
import bot from "../../asserts/botPhoto.jpg"
import { REGISTER_AUTHOR } from "../../mutations/ClientMutations"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
const Register=()=>{
    const [image,setImage]=useState("")
    const navigate=useNavigate()
    const [registerAuthor,{loading}]=useMutation(REGISTER_AUTHOR)
    const [registerUser,setRegisterUser]=useState({
        email:"",
        password:"",
        profilePic:"",
        username:"",
        age:""
    })
    const [imagePreview,setImagePreview]=useState(null)
    const [isloading,setIsloading]=useState(false)
    
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
        if(!image){
            return alert("Please provide a profile pic")
        }
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
           navigate("/",{replace:true})
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="registerWrapper">
            <div className="registerTitle">Register Here</div>
            <div className="registerTop">
                <img src={imagePreview?imagePreview:bot} alt="user" />
                <label htmlFor="add" className="label">+</label>
                <input type="file" hidden accept="image/jpg image/jpeg image/png" onChange={addImage} id="add"/>
            </div>
            <form action="#" className="form" onSubmit={handleSubmit}>
                <label htmlFor="username" className="label">Username</label>
                <input type="text" placeholder="Username" value={registerUser.username} id="username" onChange={handleChange} name="username"/>
                <label htmlFor="email" className="label">email</label>
                <input type="email" placeholder="email" value={registerUser.email} id="email" onChange={handleChange} name="email"/>
                <label htmlFor="password" className="label">password</label>
                <input type="password" placeholder="Password" value={registerUser.password} id="password" onChange={handleChange} name="password"/>
                <label htmlFor="age" className="label">Your Age</label>
                <input type="number" value={registerUser.age} id="age" onChange={handleChange} name="age" placeholder="Age"/>
                <button>{loading?"Registering":"Register"}</button>
            </form>
            <span>Already have an account?<Link to="/login">Login</Link></span>
        </div>

    )
}

export default Register