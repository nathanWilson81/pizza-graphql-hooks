import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
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

//TODO: Pad a zero for prices that are things like .1 so it shows .10

const PizzaForm = ({ name }) => {
  console.log({ name })
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
          <input type={'checkbox'} />
          <ToppingNameAndPrice>
            <div>Topping: {topping.topping.name}</div>
            <div>Price: ${topping.topping.price}</div>
          </ToppingNameAndPrice>
        </ToppingContainer>
      ))}
    </div>
  ) : (
    <p>Please select a pizza size above</p>
  )
}

export default PizzaForm
