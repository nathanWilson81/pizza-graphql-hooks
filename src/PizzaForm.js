import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { sum, isEmpty } from 'lodash/fp'
import { getPizzaDataBySize } from './queries'

const ToppingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const ToppingNameAndPrice = styled.div`
  display: flex;
  flex-direction: column;
`

// TODO: Pad a zero for prices that are things like .1 so it shows .10
// TODO: Trim total price to 2 digits
// TODO: Display max toppings in the UI
// TODO: Handle case where maxToppings is null meaning unlimited
// TODO: Disable other checkboxes when maxToppings overflows

const PizzaForm = ({ name }) => {
  const [selectedToppings, setSelectedToppings] = useState([])
  const [cart, setCart] = useState([])
  const { loading, error, data } = useQuery(getPizzaDataBySize, {
    variables: { name },
    skip: !name
  })
  useEffect(() => {
    if (data && data.pizzaSizeByName) {
      setSelectedToppings(
        data.pizzaSizeByName.toppings
          .filter(t => t.defaultSelected)
          .map(t => t.topping)
      )
    }
    console.log('effect', { data })
  }, [cart, data])
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  console.log({ data, selectedToppings })
  return name ? (
    <div>
      {data.pizzaSizeByName.toppings.map(topping => (
        <ToppingContainer key={topping.topping.name}>
          <input
            type={'checkbox'}
            checked={selectedToppings.includes(topping.topping)}
            onChange={() =>
              selectedToppings.includes(topping.topping)
                ? setSelectedToppings(
                    selectedToppings.filter(t => t !== topping.topping)
                  )
                : selectedToppings.length < data.pizzaSizeByName.maxToppings
                ? setSelectedToppings([...selectedToppings, topping.topping])
                : setSelectedToppings(selectedToppings)
            }
          />
          <ToppingNameAndPrice>
            <div>Topping: {topping.topping.name}</div>
            <div>Price: ${topping.topping.price}</div>
          </ToppingNameAndPrice>
        </ToppingContainer>
      ))}
      <p>
        Total Price $
        {data.pizzaSizeByName.basePrice +
          sum(selectedToppings.map(t => t.price))}
      </p>
      <button
        onClick={() => {
          setCart([
            ...cart,
            {
              size: data.pizzaSizeByName.name,
              toppings: selectedToppings,
              price:
                data.pizzaSizeByName.basePrice +
                sum(selectedToppings.map(t => t.price))
            }
          ])
          setSelectedToppings([])
        }}
      >
        Add Pizza to cart
      </button>
      {!isEmpty(cart) ? (
        cart.map(c => (
          <p>
            {c.size} - {c.price}
          </p>
        ))
      ) : (
        <p>Nothing in your cart yet</p>
      )}
    </div>
  ) : (
    <p>Please select a pizza size above</p>
  )
}

export default PizzaForm
