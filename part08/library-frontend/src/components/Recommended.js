import { useQuery } from "@apollo/client"
import { ME, ALL_BOOKS } from "../queries"

const Recommended = ({show}) => {

  const resultMe = useQuery(ME)
  const resultAllBooks = useQuery(ALL_BOOKS)
  
  if(!show){
    return(null)
  }

  const favouriteGenre = resultMe.loading ? null : resultMe.data.me.favouriteGenre
  const books = resultAllBooks.loading ? [] : resultAllBooks.data.allBooks
  const filteredBooks = favouriteGenre === null ? [] : [...books.filter(b => b.genres.includes(favouriteGenre))]
  

  return (
    <div>
      <h2>books</h2>
      <div>
        Books in your favourite genre <b>{favouriteGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended