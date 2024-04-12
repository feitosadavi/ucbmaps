import React from 'react'

interface ButtonProps {
  color: 'blue' | 'purple' | 'dark' | 'green' | 'red' | 'yellow'
  label: string
  className?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ color, label, className, onClick }) => {
  return <button
    type="button"
    onClick={onClick}
    className={`focus:outline-none text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800 ${className}`}>
    {label}
  </button>
}

export default Button