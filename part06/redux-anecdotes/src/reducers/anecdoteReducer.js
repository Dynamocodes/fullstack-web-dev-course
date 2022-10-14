const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

export const newAnecdote = (content) => {
  return {
    type: 'CREATE',
    data: {content}
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    data: {anecdote}
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET',
    data: {anecdotes}
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  console.log('action data:', action.data)
  switch(action.type){
    case 'VOTE':
      const stateCopy = [...state]
      const indexOfVotedAnecdote = state.map(anecdote => anecdote.id).indexOf(action.data.id)
      const {content, id, votes} = stateCopy.splice(indexOfVotedAnecdote, 1)[0]
      stateCopy.splice(indexOfVotedAnecdote, 0, { content: content, id: id, votes: votes+1 })
      return stateCopy
    case 'CREATE':
      return state.concat(asObject(action.data.content))
    case 'ADD':
      return state.concat(action.data.anecdote)
    case 'SET':
      return action.data.anecdotes
    default:
      return state
  }
}

export default reducer