import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {showVoteNotification, hideNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const orderedAnecdotes = useSelector(state => state.anecdotes.sort((a,b) => {
    return b.votes - a.votes
  }))
  const filter = useSelector(state => state.filter)

  const anecdotes = orderedAnecdotes.filter(anecdote => anecdote.content.includes(filter))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const content = anecdotes.filter(a => a.id === id)[0].content
    dispatch(showVoteNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)


  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList