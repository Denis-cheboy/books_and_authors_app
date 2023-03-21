import React from 'react'
import bot from "../../asserts/botPhoto.jpg"
import "./Profile.css"
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_AUTHOR } from '../../queries/ClientQueries'

const Profile = () => {
    const {id}=useParams()
    const {data,loading,error}=useQuery(GET_AUTHOR,{variables:{id:id}})
    if(error) return <span>Error occured durring fetch</span>
  return (
    <div className="profileWrapper">
         <div className="authorInnerWrapper profile">
          <div className="authorImageWrapper">
            <img src={data?.author?.profilePic?data.author.profilePic:bot} alt=""/>
            <span className="authorname">{data?.author.username}</span>
          </div>
          <div className="authorInfo">
            <h4 className="authorInfoHeader">Contacts</h4>
            <div className="emailAddress">
              <span className='emailAddress'>Email Address</span>
              <span>{data?.author.email}</span>
            </div>
            <div className="authorAge">
              <span className='ageHeader'>Age</span>
              <span>{data?.author.age}</span>
            </div>
            <div className="totalBooks">
              <span className='totHeader'>Total Books</span>
              <span>{data?.author?.books.length}</span>
            </div>
          </div>
          <div className="profileBooks">
            <h4 className="availableHeader" style={{margin:"30px 0px"}}>Books Available</h4>
            {loading && <span>Loading books...</span>}
            {data?.author?.books.length===0 && <h3 style={{margin:"30px 0px"}}>NO AVAILABLE BOOKS</h3>}
            {
                data?.author.books?.map(book=>(
                    <div className="individualBook">
                        <div className="bookName">Book Name: {book.name}</div>
                        <div className="bookGenre">Genre: {book.genre}</div>
                        <div className="bookGenre">Price: ${book.price?book.price:null}</div>
                        <div className="coverWrapper">
                            <img src={book.photo?book.photo:bot} alt="cover"/>
                        </div>
                        <div className="isFeatured">isFeatured: <span>{book.isFeatured?"true":"false"}</span></div>
                    </div>
                )) 
            }
          </div>
        </div>
    </div>
  )
}

export default Profile
