import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
    console.log(event.target.value)
  }

  const reset = () => {
    setValue('')
    console.log('value reseted', value)
  }

  return {
    type,
    value,
    reset,
    onChange
  }
}