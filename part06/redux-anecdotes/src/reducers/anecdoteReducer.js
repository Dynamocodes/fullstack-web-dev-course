import { createSlice } from '@reduxjs/toolkit'


const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}



const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action){
      const stateCopy = [...state]
      const indexOfVotedAnecdote = state.map(anecdote => anecdote.id).indexOf(action.payload)
      const {content, id, votes} = stateCopy.splice(indexOfVotedAnecdote, 1)[0]
      stateCopy.splice(indexOfVotedAnecdote, 0, { content: content, id: id, votes: votes+1 })
      return stateCopy
    },
    newAnecdote(state, action){
      const anecdote = asObject(action.payload)
      return state.concat(anecdote)
    },
    addAnecdote(state, action){
      return state.concat(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { voteAnecdote, newAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export { asObject } 
export default anecdoteSlice.reducer