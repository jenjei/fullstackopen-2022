import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'

const blog = {
  title: 'Benefits of Scrumban',
  author: 'Kalle Ilves',
  url: 'www.google.com',
  likes: 7,
  user: {
    name: 'Jenni',
    username: 'jenniaylis',
    password: 'asdf1234'
  }
}

const user = {
  name: 'Jenni',
  username: 'jenniaylis',
  password: 'asdf1234'
}

const handleDeleteClick = (id) => {
  console.log('clicked delete', id)
}

const handleLikeClick = (id) => {
  console.log('clicked delete', id)
}

test('renders title', () => {
  render (
    <Blog blog={blog}
      user={user}
      handleDeleteClick={handleDeleteClick}
      handleLikeClick={handleLikeClick} />
  )

  function findElementByText(text) {
    const elements = document.querySelectorAll('*')
    for (let element of elements) {
      if (element.textContent.includes(text)) {
        return element
      }
    }
    return null
  }

  const element = screen.getByTestId('not-expanded-title-test') // first way of doing this test
  expect(element).toHaveTextContent('► Benefits of Scrumban')

  const titleElement = findElementByText('► Benefits of Scrumban') // second way of doing this test
  expect(titleElement).toHaveTextContent('► Benefits of Scrumban')
})


test('details are showed when title is clicked', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog}
      user={user}
      handleDeleteClick={handleDeleteClick}
      handleLikeClick={handleLikeClick}
      test={mockHandler} />
  )

  const theUser = userEvent.setup()
  const title = screen.getByTestId('not-expanded-title-test')
  await theUser.click(title)

  const detailTitle = screen.getByTestId('expanded-title-test')
  expect(detailTitle).toHaveTextContent('▼ Benefits of Scrumban')
  const author = screen.getByTestId('author-n-username-test')
  expect(author).toHaveTextContent('Kalle Ilves | added by jenniaylis')
  const url = screen.getByTestId('url-test')
  expect(url).toHaveTextContent('www.google.com')
  const likes = screen.getByTestId('likes-test')
  expect(likes).toHaveTextContent('7')

  expect(mockHandler.mock.calls).toHaveLength(1) // this ensures that element has been clicked just once
})


test('clicking the like button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog}
      user={user}
      handleDeleteClick={handleDeleteClick}
      handleLikeClick={mockHandler}
    />
  )

  const theUser = userEvent.setup()
  const button = screen.getByText('♥')
  await theUser.click(button)
  await theUser.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<AddBlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<AddBlogForm createBlog={createBlog} />)

  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const inputTitle = screen.getByPlaceholderText('title')
  const sendButton = screen.getByText('add')

  await user.type(inputAuthor, 'me')
  await user.type(inputUrl, 'myself')
  await user.type(inputTitle, 'and AI')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('me')
  expect(createBlog.mock.calls[0][0].url).toBe('myself')
  expect(createBlog.mock.calls[0][0].title).toBe('and AI')
})