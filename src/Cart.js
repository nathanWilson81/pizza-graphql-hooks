import React from 'react'
import styled from 'styled-components'
import { sum, map, prop, reject, equals } from 'lodash/fp'

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`

const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const FullHeightButton = styled.button`
  height: 100%;
  margin-left: 1rem;
`

const ToppingList = styled.div`
  margin-left: 1rem;
`

const TitleAndButtonContainer = styled.div`
  display: flex;
`

const formatTooltip = toppings => toppings.map(t => t.name).join(', ')

const getCartTotal = cart => sum(map(prop('price'), cart))

const Cart = ({ setCart, cart }) => (
  <div>
    {cart.map(c => (
      <CartItem key={c.id}>
        <CartItemInfo>
          <TitleAndButtonContainer>
            <div title={formatTooltip(c.toppings)}>
              {c.size} {c.toppings.length} topping - ${c.price.toFixed(2)}
            </div>
            <FullHeightButton onClick={() => setCart(reject(equals(c), cart))}>
              Remove
            </FullHeightButton>
          </TitleAndButtonContainer>
          <ToppingList>{formatTooltip(c.toppings)}</ToppingList>
        </CartItemInfo>
      </CartItem>
    ))}
    <p>Total cart price: ${getCartTotal(cart).toFixed(2)}</p>
  </div>
)

export default Cart
