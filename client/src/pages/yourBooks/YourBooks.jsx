import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_AUTHOR } from '../../queries/ClientQueries'
import "./yourBooks.css"
const YourBooks = () => {
    const category=["Technology","Love","Sci-Fi","Business","Adventure"]
    const user=JSON.parse(localStorage.getItem("user"))
    const {data,loading}=useQuery(GET_AUTHOR,{
        variables:{
            id:user?.id
        }
    })
    return (
        
            !data?<span>No Available Books Please upload 1</span>:(
                <div className="yourBooksWrapper">
                    <h4 className="yourBookHeader">Book Written by you</h4>
                    <span className="yourBookTotalCount">Total Count :{data?.author?.books.length}</span>
                    <div className="yourBookInnerWrapper">
                        <h3 className="categoriesHeader">Categories</h3>
                        {
                            category.map(categ=>(
                                <div className="categoryWrapper">
                                    <h5 className="categoryHeader">{categ}</h5>
                                    {data?.author?.books.filter(book=>book.genre===categ).map(book=>(
                                        <div className='singleBook'>
                                          <span className="yourBookName">Book Name: {book.name}</span>
                                          <p className="yourBookPrice">Book Price: {book.price}</p>
                                          <p className="yourBookIsFeatured">isFeatured: {book.isFeatured?"true":"false"}</p>
                                        </div>
                                    ))}
                                </div>
                            ))
                        }
                    </div>
        
                </div>

            )
        
    )
}

export default YourBooks
