const BlogForm = (props) => {
    return (
        <div>
            <h1>
                Create new
            </h1>
            <form onSubmit={props.blogForm.handleCreate}>
                <div>
                title
                <input 
                    type='text' 
                    onChange={props.blogForm.handleTitleChange} 
                    value={props.blogForm.titleValue}
                    name='Title'/>
                </div>
                <div>
                author
                <input 
                    type='text' 
                    onChange={props.blogForm.handleAuthorChange} 
                    value={props.blogForm.authorValue}
                    name='Author'/>
                </div>
                <div>
                url
                <input 
                    type='text' 
                    onChange={props.blogForm.handleUrlChange} 
                    value={props.blogForm.urlValue}
                    name='Url'/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm