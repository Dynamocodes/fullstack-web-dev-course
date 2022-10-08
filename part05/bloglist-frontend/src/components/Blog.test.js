import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {

  let container

  beforeEach(() => {
    const blog = {
      title: 'title of the new blog',
      author: 'Elias Hietanen',
      url: 'www.url.com',
      likes: 15,
      user: '633338587927272a0c034129'
    }

    const handleUpdate = () => {}
    const handleDelete = () => {}
    const isUserOwner = () => {}

    container = render(
      <Blog
        blog={blog}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        isUserOwner={isUserOwner} />
    ).container
  })

  test('only renders blog name and author by default', () => {
    const titleAndAuthor = screen.getByText('title of the new blog Elias Hietanen')
    const div = container.querySelector('.shortenedBlog')
    expect(titleAndAuthor).toBeDefined()
    expect(div).toBeDefined()
    expect(div).toHaveTextContent('title of the new blog Elias Hietanen')
    expect(div).not.toHaveTextContent('www.url.com')
    expect(div).not.toHaveTextContent('likes 15')
  })
})

