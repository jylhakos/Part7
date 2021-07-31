import { useState } from 'react'

// 7.4
export const useField = (type) => {

  const [value, setValue] = useState('')

  const onChange = (event) => {

    console.log('event.target.type', event.target.type)

    console.log('event.target.value', event.target.value)

    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}