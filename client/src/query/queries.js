import {gql} from 'apollo-boost';

const getBooksQuery=gql`
{
    books{
      name
      id
      genre
    }
  }
`

const getAuthorsQuery=gql`
{
    authors{
      name
      id
    }
}
`
const addBookMutation=gql`
mutation($name:String!, $genre:String!, $authorId:ID!){
    addABook(name:$name,genre:$genre,authorId:$authorId){
        name
        id
    }
  }
`

const getBookDetails=gql`
query($id: ID){
    book(id: $id){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}
`

export {getAuthorsQuery,getBooksQuery,addBookMutation,getBookDetails}