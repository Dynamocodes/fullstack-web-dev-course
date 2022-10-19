import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {showVoteNotification, hideNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const unorderedAnecdotes = [...useSelector(state => state.anecdotes)]
  const orderedAnecdotes = unorderedAnecdotes.sort((a,b) => {
    return b.votes - a.votes
  })
  console.log('ordered anecdotes:', orderedAnecdotes)
  const filter = useSelector(state => state.filter)
  console.log('filter: ', filter)
  
  const anecdotes = orderedAnecdotes.filter(anecdote => anecdote.content.includes(filter))
  console.log('anecdotes: ', anecdotes) 
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