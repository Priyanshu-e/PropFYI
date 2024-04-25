import * as React from "react"

function BathImage(props) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.1 10.8v.9a4.488 4.488 0 01-2.385 3.969L15.3 18h-1.8l-.45-1.8h-8.1L4.5 18H2.7l.585-2.331A4.488 4.488 0 01.9 11.7v-.9H0V9h16.2V2.7a.9.9 0 00-.9-.9c-.45 0-.792.306-.9.711.567.486.9 1.206.9 1.989H9.9a2.7 2.7 0 012.7-2.7h.153A2.703 2.703 0 0117.209.79 2.7 2.7 0 0118 2.7v8.1h-.9zm-1.8 0H2.7v.9a2.7 2.7 0 002.7 2.7h7.2a2.7 2.7 0 002.7-2.7v-.9z"
        fill="#3DB2FF"
      />
    </svg>
  )
}

export default BathImage
