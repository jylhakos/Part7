import { useState, useEffect } from 'react'

// 7.4
export const useField = (initial) => {

  const [value, setValue] = useState(initial)

  /*
  const onChange = (event) => {

    console.log('event.target.type', event.target.type)

    setValue(event.target.value)
  }
  */

  // 7.5
  return {
    value,
    setValue,
    //onChange,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  }
}