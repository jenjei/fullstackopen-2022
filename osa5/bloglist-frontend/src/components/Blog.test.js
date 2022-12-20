import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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
  
  const titleElement = findElementByText('► Benefits of Scrumban')
  expect(titleElement).toHaveTextContent('► Benefits of Scrumban')
})