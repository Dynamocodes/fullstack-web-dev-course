const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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

export const addAnecdote = (content) => {
  return {
    type: 'CREATE',
    data: {content}
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'VOTE':
      const stateCopy = [...state]
      const indexOfVotedAnecdote = state.map(anecdote => anecdote.id).indexOf(action.data.id)
      const {content, id, votes} = stateCopy.splice(indexOfVotedAnecdote, 1)[0]
      stateCopy.splice(indexOfVotedAnecdote, 0, { content: content, id: id, votes: votes+1 })
      return stateCopy
    case 'CREATE':
      return state.concat(asObject(action.data.content))
    default:
      return state
  }
}

export default reducer