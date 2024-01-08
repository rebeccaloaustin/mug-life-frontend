import React from 'react'

export default function UserCheckout(props) {
    const {user, handleCheckout} = props
  return (
    <div id="userCheckout">
    <div>User is {user.email}</div>
    <button onClick={handleCheckout} className="button">Continue to checkout</button>
  </div>
  )
}
