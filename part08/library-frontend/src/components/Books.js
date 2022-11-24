import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [selectedGenre, setSelectedGenre] = useState(null)
  
  const filter = selectedGenre === null ? "all genres" : selectedGenre

  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  const books = result.loading ? [] : result.data.allBooks
  const genres = books.length === 0 ? [] : Array.from(new Set(books.map(b => b.genres).flat()))
  const filteredBooks = selectedGenre === null ? [...books] : [...books.filter(b => b.genres.includes(selectedGenre))]

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
          {filteredBooks.map((b) => (
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
