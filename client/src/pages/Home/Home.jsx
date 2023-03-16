import React from 'react'
import bot from "../../asserts/botPhoto.jpg"
import "./Home.css"
import {useQuery } from '@apollo/client'
import {Link} from "react-router-dom"
import { GET_AUTHORS_WITH_BOOKS } from '../../queries/ClientQueries'
const Home = () => {
  const {data,loading,error}=useQuery(GET_AUTHORS_WITH_BOOKS)
  
  if(error) return <h1>Error occured durring fetch</h1>

  return (
    <div className="overalWrapper">
        {
            loading?"Loading Authors...":
            data?.authors  && data.authors.map(author=>(
                <div className='homeWrapper'>
                    
                    <div className="topWrapper">
                        <div className="authorProfile">
                            <img src={author?.profilePic?author?.profilePic:bot} alt="user" />
                        </div>
                        <Link to={`/profile/${author.id}`} style={{textDecoration:"none",color:"inherit"}}>
                          <span>{author.username}</span>
                        </Link> 
                    </div>
                    <div className="famousBook">
                        <div className="title">Featured Book</div>
                        {
                            author?.books?.map(book=>book.isFeatured ?(
                                <div className="imageWrapper">
                                    <img src={book.photo} alt="book" />
                                    <div className="textWrapper">
                                        <div className="text">
                                            <span>{book.name}</span>
                                        </div>
                                    </div>
                                </div>

                            ):
                            (
                                <div className="imageWrapper noFeatured">
                                    <div className="textWrapper">
                                        <div className="text">
                                            <span>No featured book</span>
                                        </div>
                                    </div>
                                </div>

                            )
                            ).slice(0,1)
                        }
                    </div>
                    <div className="authoursAge">
                        <span>Authors Age :</span>
                        <span className="age">{author.age}</span>
                    </div>
                    <div className="authorBooks">
                        <div className='booksByUser'>Books Written By {author.username}</div>
                        <div className="totalCount">Total Count: {author.books.length}</div>
                    </div>
                </div>

            )) 
        }
    </div>
  )
}

export default Home
