import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { PIZZA_SIZE_OPTIONS } from './queries'
import PizzaForm from './PizzaForm'

const AppContainer = styled.div`
  padding: 1rem;
`

const ToppingSelectContainer = styled.div`
  display: flex;
  align-items: center;
`

const ToppingSelectText = styled.h2`
  margin-right: 1rem;
`

const App = () => {
  const { loading, error, data } = useQuery(PIZZA_SIZE_OPTIONS)
  const [currentPizzaSize, setCurrentPizzaSize] = useState('')
  useEffect(() => {
    if (data && data.__type) {
      setCurrentPizzaSize(data.__type.enumValues[0].name)
    }
  }, [data])
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  return (
    <AppContainer>
      <ToppingSelectContainer>
        <ToppingSelectText>Please select your size of pizza</ToppingSelectText>
        <select
          value={currentPizzaSize}
          onChange={e => setCurrentPizzaSize(e.target.value)}
        >
          {data.__type.enumValues.map(pizza => (
            <option key={pizza.name} value={pizza.name}>
              {pizza.name}
            </option>
          ))}
        </select>
      </ToppingSelectContainer>
      <PizzaForm name={currentPizzaSize} />
    </AppContainer>
  )
}

export default App
