import React from 'react'

const Button = ({text}) => {
  return (
    <button
        type="submit"
        className="text-sm text-center bg-blue-300 text-white py-1 px-2 rounded font-medium"
    >
        {text}
    </button>
  )
}

export default Button
