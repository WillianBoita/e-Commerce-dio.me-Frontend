import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import './button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function Button({ className, type = 'button', onClick, children, ...props}: ButtonProps) {
  return (
    <button className={className} type={type} onClick={onClick} {...props}>{children}</button>
  )
}
