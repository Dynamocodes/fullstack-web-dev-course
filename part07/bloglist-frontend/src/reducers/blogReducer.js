import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers:{
        setBlogs(state, action){
            return action.payload
        },
        addBlog(state, action){
            return state.concat(action.payload)
        },
        deleteBlog(state, action){
            return state.filter(b => b.id !== action.payload)
        },
        editBlog(state, action){
            const stateCopy = [...state]
            const indexToUpdate = stateCopy.map((b) => b.id).indexOf(action.payload.id)
            stateCopy.splice(indexToUpdate, 1, action.payload.blog)
            return stateCopy
        }
    }
})

export const { setBlogs, addBlog, deleteBlog, editBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createNewBlog = (blog) => {
    return async dispatch => {
        const returned = await blogService.create(blog)
        dispatch(addBlog(returned))
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(deleteBlog(id))
    }
}

export const updateBlog = (id, blog) => {
    return async dispatch => {
        const updated = await blogService.update(id, blog)
        dispatch(editBlog({id:id, blog:updated}))

    }
}


export default blogSlice.reducer
