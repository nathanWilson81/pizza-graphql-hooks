import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { PIZZA_SIZE_OPTIONS } from './queries'
import PizzaForm from './PizzaForm'

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
    <div>
      <div>
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
      </div>
      <PizzaForm name={currentPizzaSize} />
    </div>
  )
}

export default App
