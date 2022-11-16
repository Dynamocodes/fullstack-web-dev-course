import { useQuery } from '@apollo/client'
import BirthdateForm from './BirthdateForm'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  
  const authors = result.loading ? [] : result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <BirthdateForm authors={authors}/>
    </div>
  )
}

export default Authors
