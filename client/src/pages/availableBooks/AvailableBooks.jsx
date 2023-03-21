import { useQuery } from '@apollo/client'
import React from 'react'
import bot from "../../asserts/botPhoto.jpg"
import { GET_BOOKS } from '../../queries/ClientQueries'
import "./AvailableBooks.css"
const AvailableBooks = () => {
    const {data,loading,error}=useQuery(GET_BOOKS)
    if(error) return <span>Error occurred please check your network</span>
  return (
    <div className="availableBookWrapper">
        {
            loading?<span>Loading books...</span>:
            data?.books.map(book=>(
                <div className="individualBook">
                    <div className="bookName">Book Name: {book.name}</div>
                    <div className="bookGenre">Genre: {book.genre}</div>
                    <div className="bookGenre">Price: ${book.price?book.price:10}</div>
                    <div className="coverWrapper">
                        <img src={book.photo?book.photo:undefined} alt="cover"/>
                    </div>
                    <div className="isFeatured">isFeatured: <span>{book.isFeatured?"true":"false"}</span></div>
                    <div className="authorName">Author Name: {book.author.username}</div>
                </div>
            ))
        }
    </div>
    
  )
}

export default AvailableBooks
