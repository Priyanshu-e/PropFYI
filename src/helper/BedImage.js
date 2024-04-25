import * as React from "react"

function BedImage(props) {
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
        d="M18 5V2a2 2 0 00-2-2H4a2 2 0 00-2 2v3a2 2 0 00-2 2v5h1.33L2 14h1l.67-2h12.66l.67 2h1l.67-2H20V7a2 2 0 00-2-2zm-7-3h5v3h-5M4 2h5v3H4m14 5H2V7h16v3z"
        fill="#3DB2FF"
      />
    </svg>
  )
}

export default BedImage
