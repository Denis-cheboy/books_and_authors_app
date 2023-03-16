const {
  GraphQLID,GraphQLObjectType,GraphQLList,GraphQLError,GraphQLEnumType,GraphQLString,GraphQLInt, GraphQLScalarType, GraphQLSchema, GraphQLBoolean
}=require("graphql")

const Book=require("../model/Book")
const Author=require("../model/Author")
const { hash, comparePasswords } = require("../utils/hashPassword")

const BookType=new GraphQLObjectType({
    name:"Book",
    description:"Book Type",
    fields:()=>({
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        authorId:{type:GraphQLID},
        price:{type:GraphQLInt},
        photo:{type:GraphQLString},
        id:{type:GraphQLID},
        isFeatured:{type:GraphQLBoolean},
        author:{
            type:AuthorType,
            resolve(parent,args){
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType=new GraphQLObjectType({
    name:"Author",
    description:"Author Type",
    fields:()=>({
        username:{type:GraphQLString},
        age:{type:GraphQLInt},
        id:{type:GraphQLID},
        profilePic:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({authorId:parent.id})
            }
        }
    })
})

const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    description:"Root Query",
    fields:{
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find()
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find()
            }
        },
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Author.findById(args.id)
            }
        }
    }
})

const MutationType=new GraphQLObjectType({
    name:"Mutation",
    description:"Mutation Type",
    fields:{
        addBook:{
            type:BookType,
            args:{
                id:{type:GraphQLID},
                name:{type:GraphQLString},
                authorId:{type:GraphQLID},
                genre:{type:GraphQLString},
                price:{type:GraphQLInt},
                photo:{type:GraphQLString},
            },
            resolve(parent,args){
                const newBook=Book.create({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId,
                    price:args.price,
                    photo:args.photo,
                })
                return newBook
            }
        },
        registerAuthor:{
            type:AuthorType,
            args:{
                id:{type:GraphQLID},
                username:{type:GraphQLString},
                age:{type:GraphQLInt},
                email:{type:GraphQLString},
                password:{type:GraphQLString},
                profilePic:{type:GraphQLString}
            },
            async resolve(parent,args){
                   const foundUser=await Author.findOne({email:args.email})
                   if(foundUser) throw new GraphQLError("User already exists")
                    const newAuthor=Author.create({
                        username:args.username,
                        age:args.age,
                        email:args.email,
                        password: await hash(args.password),
                        profilePic: args.profilePic
                    })
                   return newAuthor
                
            }
        },
        loginAuthor:{
            type:AuthorType,
            args:{
                email:{type:GraphQLString},
                password:{type:GraphQLString}
            },
            async resolve(parent,args){
                const {email,password}=args
                const foundUser=await Author.findOne({email:email})
                if(!foundUser) throw new GraphQLError("User does not exists")
                const comparePassword=await comparePasswords(foundUser.password,password)
                if(!comparePassword) throw new GraphQLError("Wrong email or password")
                return foundUser
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:MutationType
})
