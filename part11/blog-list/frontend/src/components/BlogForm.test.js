import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {

  let handleCreateMock

  beforeEach(() => {

    handleCreateMock = jest.fn()

    render(
      <BlogForm
        handleCreate={handleCreateMock} />
    ).container
  })

  test('create blog handler is called with the right data when the submit button is pressed', async () => {
    const user = userEvent.setup()
    /* getting all the interactive elements */
    const createButton = screen.getByText('create')
    const titleInput = screen.getByPlaceholderText('enter blog title')
    const authorInput = screen.getByPlaceholderText('enter blog author name')
    const urlInput = screen.getByPlaceholderText('enter blog url')

    /* inputing all the data in text-input fields */
    await user.type(titleInput, 'new blog')
    await user.type(authorInput, 'Elias Hietanen')
    await user.type(urlInput, 'www.void.com')
    await user.click(createButton)
    expect(handleCreateMock.mock.calls).toHaveLength(1)
    const { title , author, url } = handleCreateMock.mock.calls[0][0]
    expect(title).toBe('new blog')
    expect(author).toBe('Elias Hietanen')
    expect(url).toBe('www.void.com')
  })
})

