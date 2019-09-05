import React from 'react'
import styled from 'styled-components'
import { sum } from 'lodash/fp'

const CartItem = styled.div`
  display: flex;
`

const formatTooltip = toppings => toppings.map(t => t.name).join(', ')

const Cart = ({ setCart, cart }) => (
  <div>
    {cart.map((c, index) => (
      <CartItem key={index}>
        <div title={formatTooltip(c.toppings)}>
          {c.size} {c.toppings.length} topping - ${c.price.toFixed(2)}
        </div>
        <button onClick={() => setCart(cart.filter(item => item !== c))}>
          Remove
        </button>
      </CartItem>
    ))}
    <p>Total cart price: ${sum(cart.map(c => c.price)).toFixed(2)}</p>
  </div>
)

export default Cart
