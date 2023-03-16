import { gql } from "@apollo/client";


const ADD_BOOK=gql`
  mutation addBook($name:String!,$authorId:ID!,$genre:String!,$photo:String!,$price:Int){
    addBook(name:$name,genre:$genre,authorId:$authorId,photo:$photo,price:$price){
        name,
        genre,
        authorId,
        photo,
        price,
    }
  }
`;

const REGISTER_AUTHOR=gql`
 mutation registerAuthor($username:String!,$email:String!,$password:String!,$profilePic:String!,$age:Int!){
   registerAuthor(username:$username,password:$password,email:$email,profilePic:$profilePic,age:$age){
    email,
    password,
    profilePic,
    username,
    id,
    age
   }
 }

`

export const LoginAuthor=gql`
mutation loginUser($email:String!,$password:String!){
  loginAuthor(email:$email,password:$password){
    email,
    password,
    profilePic,
    username,
    id,
    age
  }
}

`

export {ADD_BOOK,REGISTER_AUTHOR}