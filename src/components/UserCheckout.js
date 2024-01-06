import React from 'react'

export default function UserCheckout(props) {
    const {user, handleCheckout} = props
  return (
    <div>
    <div>User is {user.email}</div>
    <button onClick={handleCheckout} className="btn btn-primary">Submit</button>
  </div>
  )
}
