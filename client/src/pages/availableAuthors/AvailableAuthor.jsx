import { useQuery } from '@apollo/client'
import React from 'react'
import bot from "../../asserts/botPhoto.jpg"
import { GET_AUTHORS } from '../../queries/ClientQueries'
import "./AvailableAuthor.css"
const AvailableAuthor = () => {
  const {data,loading,error}=useQuery(GET_AUTHORS)
  if(error) return <span>Error occurred please check your network</span>


  return (
    <div className="authorWrapper">
      {loading && <p>Loading authors...</p>}
      {data && data.authors.map(author=>(
        <div className="authorInnerWrapper">
          <div className="authorImageWrapper">
            <img src={author.profilePic?author.profilePic:bot} alt=""/>
            <span className="authorname">{author.username}</span>
          </div>
          <div className="authorInfo">
            <h4 className="authorInfoHeader">Contacts</h4>
            <div className="emailAddress">
              <span className='emailAddress'>Email Address</span>
              <span>{author.email}</span>
            </div>
            <div className="authorAge">
              <span className='ageHeader'>Age</span>
              <span>{author.age}</span>
            </div>
            <div className="totalBooks">
              <span className='totHeader'>Total Books</span>
              <span>{author.books.length}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AvailableAuthor
