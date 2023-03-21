import React from 'react'
import { useQuery } from '@apollo/client'
import "./Technology.css"
import { GET_BOOKS } from '../../queries/ClientQueries'
import bot from "../../asserts/botPhoto.jpg"
const Technology = () => {
    const {data}=useQuery(GET_BOOKS)
    return (
        <div className="availableBookWrapper">
            {data?.books.map(book=>book.genre==="Technology" && 
                <div className="individualBook">
                    <div className="bookName">Book Name: {book.name}</div>
                    <div className="bookGenre">Genre: {book.genre}</div>
                    <div className="bookGenre">Price: ${book.price?book.price:10}</div>
                    <div className="coverWrapper">
                        <img src={book?.photo?book.photo:undefined} alt="cover"/>
                    </div>
                    <div className="isFeatured">isFeatured: <span>{book.isFeatured?"true":"false"}</span></div>
                    <div className="authorName">Author Name: {book.author.username}</div>
                </div>
            )}
        </div>
  )
}

export default Technology
