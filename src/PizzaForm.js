import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { sum } from 'lodash/fp'
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

const PizzaForm = ({ name }) => {
  const [selectedToppings, setSelectedToppings] = useState([])
  const { loading, error, data } = useQuery(getPizzaDataBySize, {
    variables: { name },
    skip: !name
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  console.log({ data, name })
  return name ? (
    <div>
      {data.pizzaSizeByName.toppings.map(topping => (
        <ToppingContainer key={topping.topping.name}>
          <input
            type={'checkbox'}
            preventDefault
            checked={selectedToppings.includes(topping.topping)}
            onClick={() =>
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
    </div>
  ) : (
    <p>Please select a pizza size above</p>
  )
}

export default PizzaForm
