import { useState} from 'react'

const Blog = ({blog}) => {
  
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailedView, setDetailedView] = useState(false)

  const buttonLabel = detailedView ? "hide" : "view"

  const toggleDetailedView = () => {
    setDetailedView(!detailedView)
  }

  if(detailedView) {
    return(
      <div style={blogStyle}>
        <div>{blog.title} {blog.author}<button onClick={toggleDetailedView}>{buttonLabel}</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button>like</button></div>
      </div>
    )
  }
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetailedView}>view</button>
    </div>
  )  
}

export default Blog