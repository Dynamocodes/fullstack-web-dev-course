import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS_BY_GENRE, ALL_GENRES } from '../queries'

const Books = (props) => {

  const [selectedGenre, setSelectedGenre] = useState(null)
  
  const filter = selectedGenre === null ? "all genres" : selectedGenre
  const variables = selectedGenre === null ? {} : {genre: selectedGenre}
  const resultAllBooksByGenre = useQuery(ALL_BOOKS_BY_GENRE, { variables: variables })
  const restultAllGenres = useQuery(ALL_GENRES)
  if (!props.show) {
    return null
  }

  const books = resultAllBooksByGenre.loading ? [] : resultAllBooksByGenre.data.allBooks
  const genres = restultAllGenres.loading ? [] : restultAllGenres.data.allGenres
  

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <b>{filter}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {genres.map((g) => <button key={g} onClick={() => setSelectedGenre(g)} >{g}</button>)}
      <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
