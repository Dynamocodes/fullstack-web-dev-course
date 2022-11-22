const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://dynamo:appdatabase123@cluster0.givzdhk.mongodb.net/library?retryWrites=true&w=majority'
const JWT_SECRET = 'SEKRET'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
  }

  type AuthorWithBookCount {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!

    allBooks(author: String, genre: String): [Book!]!

    authorCount: Int!

    allAuthors: [Author!]!

    allAuthorsWithBookCount: [AuthorWithBookCount!]!

    me: User
  }


  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): AuthorWithBookCount

    createUser(
      username: String!
      favouriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

  }
`
const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),

    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },

    bookCount: () => Book.collection.countDocuments(),

    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      filteredBooks = [...books]
      filteredBooks = 
      args.author === undefined 
        ? filteredBooks 
        : filteredBooks.filter(book => book.author.name === args.author)
      filteredBooks = 
      args.genre === undefined
        ? filteredBooks
        : filteredBooks.filter(book => book.genres.includes(args.genre))
      return filteredBooks
    },

    allAuthorsWithBookCount: async () => {
      const authors = await Author.find({})
      return authors
    },

    me: (root, args, context) => {
      return context.currentUser
    } 
  },

  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
  },

  AuthorWithBookCount: {
    name: (root) => root.name,
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.reduce((amount, book) => {
        return book.author.name === root.name ? amount + 1 : amount
      }, 0)
    },
    id: (root) => root.id,
    born: (root) => root.born,
  },


  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: async (root) => root.author,
    id: (root) => root.id,
    genres: (root) => root.genres,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      // error if not logged in
      if(!currentUser){
        throw new AuthenticationError("you need to be logged in to perform this action")
      }
      // error if author name is too short
      if(args.author.length < 4){
        throw new UserInputError(
          "The name of the author must be at least 4 characters long"
        )
      }
      // error if title is too short
      if(args.title.length < 2){
        throw new UserInputError("The title of the book must be at least 2 characters long")
      }
      let author = await Author.findOne({name : args.author})
      if(!author){
        author = new Author({name: args.author})
      }
      let book = new Book(
      {
        title: args.title, 
        published: args.published,
        author: author,
        genres: args.genres
      })
      try{
        await author.save()
        await book.save()
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("you need to be logged in to perform this action")
      }
        let author = await Author.findOne({name: args.name})
        if(author){
          author.born = args.setBornTo
          try{
            await author.save()
          }catch(error){
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          
        }
        return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})