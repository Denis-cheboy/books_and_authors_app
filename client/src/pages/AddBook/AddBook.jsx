import { useMutation} from '@apollo/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import bot from "../../asserts/botPhoto.jpg"
import "./AddBook.css"
import { useApp } from '../../context/appContext'
import { ADD_BOOK } from '../../mutations/ClientMutations'
import { GET_BOOKS } from '../../queries/ClientQueries'
import { Navigate,useLocation, useNavigate } from 'react-router-dom'

const AddBook = () => {
    const {currentUser,setCurrentUser}=useApp()
    const location=useLocation()
    const navigate=useNavigate()
    const [addBook,{loading}]=useMutation(ADD_BOOK)

    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem("user"))
        setCurrentUser(data)
        
    },[])

    const [book,setBook]=useState({
        name:"",
        genre:"",
        authorId:"",
        price:"",
        photo:""
    })
    const [image,setImage]=useState("")
    const [imagePreview,setImagePreview]=useState(null)
    const [uploading,setUploading]=useState(false)
    
    const handleChange=(e)=>{
        setBook(book=>({...book,[e.target.name]:e.target.value}))
    }
    const addPhoto=(e)=>{
        const file=e.target.files[0]
        if(file>=1048758){
            alert("File must be 1mb or less")
        }
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const uploadImage=async(image)=>{
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","Deno@1")
        try{
            setUploading(true)
           const res=await axios.post("https://api.cloudinary.com/v1_1/dwzcawi1h/image/upload",data)
           setUploading(false)
           return res.data.url
        }
        catch(err){
            setUploading(false)
            console.log(err)
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
          const url=await uploadImage(image)
          const data={...book,photo:url,authorId:currentUser.id}
          await addBook({
            variables:{
               name:data.name,
               genre:data.genre,
               photo:data.photo,
               authorId:data.authorId,
               price:Number(data.price)
            },
            refetchQueries:[{query:GET_BOOKS}]
          })
          navigate("/",{replace:true})
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        !currentUser?
        <Navigate to="/login"state={{from:location}}/>
        :
        (
            <div className="modal">
                <div className="modalHeader">Add Your Book</div>
                <form action="#" className="modalForm" onSubmit={handleSubmit}>
                    <label htmlFor="bookName">Book Name</label>
                    <input value={book.name} onChange={handleChange} name="name" id="bookName"/>
                    <label htmlFor='Genre'>Genre</label>
                    <input value={book.genre} onChange={handleChange} name="genre" id="Genre"/>
                    <label htmlFor='price'>Price</label>
                    <input id="price" value={book.price} onChange={handleChange} name="price"/>
                    <div className="photoWrapper">
                        <img src={imagePreview?imagePreview:bot} alt="" />
                        <label htmlFor='add' className='add'>Add Photo</label>
                        <input hidden id="add" accept='image/jpg image/jpeg image/png' type="file" onChange={addPhoto}/>
                    </div>
                    <button className="submitBtn">Submit</button>
                </form>
                <button className="cancalAdd" onClick={()=>navigate("/")}>Cancel Process</button>
            </div>
    
        )
        
    )  
    
  
}

export default AddBook
