import { useState } from 'react'

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    
      const handleTitleChange = (event) => { setTitle(event.target.value)}
      const handleAuthorChange = (event) => { setAuthor(event.target.value)}
      const handleUrlChange = (event) => { setUrl(event.target.value)}
      const createBlog = (event) => {
        event.preventDefault()
        const blog = {
            title: title,
            author: author,
            url: url
        }
        props.blogForm.handleCreate(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
      }

    return (
        <div>
            <h1>
                Create new
            </h1>
            <form onSubmit={createBlog}>
                <div>
                title
                <input 
                    type='text' 
                    onChange={handleTitleChange} 
                    value={title}
                    name='Title'/>
                </div>
                <div>
                author
                <input 
                    type='text' 
                    onChange={handleAuthorChange} 
                    value={author}
                    name='Author'/>
                </div>
                <div>
                url
                <input 
                    type='text' 
                    onChange={handleUrlChange} 
                    value={url}
                    name='Url'/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm