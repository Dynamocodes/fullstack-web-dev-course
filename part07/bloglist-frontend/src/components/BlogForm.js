import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const createBlog = (event) => {
    event.preventDefault();
    const blog = {
      title: title,
      author: author,
      url: url,
    };
    handleCreate(blog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="blogForm">
      <h1>Create new</h1>
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            id="titleInput"
            type="text"
            onChange={handleTitleChange}
            value={title}
            name="Title"
            placeholder="enter blog title"
          />
        </div>
        <div>
          author
          <input
            id="authorInput"
            type="text"
            onChange={handleAuthorChange}
            value={author}
            name="Author"
            placeholder="enter blog author name"
          />
        </div>
        <div>
          url
          <input
            id="urlInput"
            type="text"
            onChange={handleUrlChange}
            value={url}
            name="Url"
            placeholder="enter blog url"
          />
        </div>
        <button id="createBlogButton" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};
BlogForm.displayName = "BlogForm";

export default BlogForm;
