import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    dispatch(addNewAnecdote(content))
  } 

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm