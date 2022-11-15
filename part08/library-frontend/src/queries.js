import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!,
    $published: Int!,
    $author: String!,
    $genres: [String!]!
    ){
    addBook (
      title: $title
      published: $published
      author: $author
      genres: $genres
    ){
      title
      published
      author
      genres
    }
  }`

export const ALL_BOOKS = gql`
  query {
    allBooks {
        title
        published
        author
        id
    }
  }`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
      id
    }
  }`

  export const EDIT_BIRTHYEAR = gql`
  mutation editBirthyear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      bookCount
      born
      id
    }
  }
`