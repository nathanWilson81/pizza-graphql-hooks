import React from 'react'
import styled from 'styled-components'
import { sum, map, prop, reject, equals } from 'lodash/fp'

const CartItem = styled.div`
  display: flex;
`

const formatTooltip = toppings => toppings.map(t => t.name).join(', ')

const getCartTotal = cart => sum(map(prop('price'), cart))

const Cart = ({ setCart, cart }) => (
  <div>
    {cart.map(c => (
      <CartItem key={c.id}>
        <div title={formatTooltip(c.toppings)}>
          {c.size} {c.toppings.length} topping - ${c.price.toFixed(2)}
        </div>
        <button onClick={() => setCart(reject(equals(c), cart))}>Remove</button>
      </CartItem>
    ))}
    <p>Total cart price: ${getCartTotal(cart).toFixed(2)}</p>
  </div>
)

export default Cart
