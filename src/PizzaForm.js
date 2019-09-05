import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import {
  sum,
  isEmpty,
  startCase,
  isNull,
  tail,
  reject,
  equals
} from 'lodash/fp'
import uuidv4 from 'uuid/v4'
import { PIZZA_DATA_BY_SIZE } from './queries'
import Cart from './Cart'

const ToppingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const ToppingNameAndPrice = styled.div`
  display: flex;
  flex-direction: column;
`

const FormAndCartContainer = styled.div`
  display: flex;
`

const FullWidthDiv = styled.div`
  width: 100%;
`

const handleToppingCheckboxClick = ({
  selectedToppings,
  topping,
  setSelectedToppings,
  maxToppings
}) => {
  if (selectedToppings.includes(topping)) {
    setSelectedToppings(reject(equals(topping), selectedToppings))
  } else if (selectedToppings.length < maxToppings || isNull(maxToppings)) {
    setSelectedToppings([...selectedToppings, topping])
  } else {
    setSelectedToppings([...tail(selectedToppings), topping])
  }
}

const handleAddPizzaToCart = ({
  setCart,
  cart,
  size,
  basePrice,
  selectedToppings,
  setSelectedToppings
}) => {
  setCart([
    ...cart,
    {
      size,
      toppings: selectedToppings,
      price: basePrice + sum(selectedToppings.map(t => t.price)),
      id: uuidv4()
    }
  ])
  setSelectedToppings([])
}

const formatHeaderText = (name, maxToppings) =>
  `${startCase(name)} pizza - Maximum Toppings: ${
    isNull(maxToppings) ? 'Unlimited!' : maxToppings
  }`

const setDefaultToppings = (setSelectedToppings, toppings) =>
  setSelectedToppings(
    toppings.filter(t => t.defaultSelected).map(t => t.topping)
  )

const PizzaForm = ({ name }) => {
  const [selectedToppings, setSelectedToppings] = useState([])
  const [cart, setCart] = useState([])
  const { loading, error, data = {} } = useQuery(PIZZA_DATA_BY_SIZE, {
    variables: { name },
    skip: !name
  })
  const { pizzaSizeByName = {} } = data
  const {
    toppings = [],
    name: pizzaSize = '',
    maxToppings = null,
    basePrice = 0
  } = pizzaSizeByName
  useEffect(() => {
    if (data && pizzaSizeByName) {
      setDefaultToppings(setSelectedToppings, toppings)
    }
  }, [cart, data])
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  return name ? (
    <FormAndCartContainer>
      <FullWidthDiv>
        <h3>{formatHeaderText(pizzaSize, maxToppings)}</h3>
        {data.pizzaSizeByName.toppings.map(({ topping }) => (
          <ToppingContainer key={topping.name}>
            <input
              type={'checkbox'}
              checked={selectedToppings.includes(topping)}
              onChange={() =>
                handleToppingCheckboxClick({
                  selectedToppings,
                  topping,
                  setSelectedToppings,
                  maxToppings
                })
              }
            />
            <ToppingNameAndPrice>
              <div>
                {topping.name}: ${topping.price.toFixed(2)}
              </div>
            </ToppingNameAndPrice>
          </ToppingContainer>
        ))}
        <p>
          Total Pizza Price $
          {(basePrice + sum(selectedToppings.map(t => t.price))).toFixed(2)}
        </p>
        <button
          onClick={() =>
            handleAddPizzaToCart({
              setCart,
              cart,
              size: pizzaSize,
              basePrice,
              selectedToppings,
              setSelectedToppings
            })
          }
        >
          Add Pizza to cart
        </button>
      </FullWidthDiv>
      <FullWidthDiv>
        <h3>Cart</h3>
        {!isEmpty(cart) ? (
          <Cart cart={cart} setCart={setCart} />
        ) : (
          <p>Nothing in your cart yet</p>
        )}
      </FullWidthDiv>
    </FormAndCartContainer>
  ) : (
    <p>Please select a pizza size above</p>
  )
}

export default PizzaForm
