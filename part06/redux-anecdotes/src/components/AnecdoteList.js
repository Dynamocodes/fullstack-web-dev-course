import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const unorderedAnecdotes = [...props.anecdotes]
  const orderedAnecdotes = unorderedAnecdotes.sort((a,b) => {
    return b.votes - a.votes
  })
  console.log('ordered anecdotes:', orderedAnecdotes)
  
  const anecdotes = orderedAnecdotes.filter(anecdote => anecdote.content.includes(props.filter))
  console.log('anecdotes: ', anecdotes) 

  const vote = (id) => {
    const toUpdate = anecdotes.filter(a => a.id === id)[0]
    let updated = {...toUpdate}
    updated.votes += 1
    props.voteForAnecdote(id, updated)
    props.setNotification(`you voted ${updated.content}`, 5)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter : state.filter
  }
}

const mapDispatchToProps = {
  voteForAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList