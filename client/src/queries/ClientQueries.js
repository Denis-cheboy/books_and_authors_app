import { gql } from "@apollo/client";

export const GET_BOOKS=gql`
   query getBooks{
     books{
      name,
      isFeatured,
      genre,
      price,
      photo,
      id,
      author{
        username
      }
     }
   }
`;

export const GET_AUTHORS=gql`
   query getAuthors{
    authors{
        username,
        age,
        profilePic,
        email,
        books{
          name,
          genre
        }
    }
   }
`
export const GET_AUTHORS_WITH_BOOKS=gql`
   {
    authors{
      username,
      id,
      age,
      profilePic,
      books{
        name,
        isFeatured,
        genre,
        photo
      }
    }
   }
`
export const GET_AUTHOR=gql`
  query getAuthor($id:ID!){
    author(id:$id){
        username,
        age,
        books{
          name,
          genre,
          price,
          isFeatured
        }
    }
  }
`

export const GET_BOOK=gql`
   {
    book(id:"63e1f6bc49b02b4fdaea7de8"){
      name,
      genre
    }
   }
`