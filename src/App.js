import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getPizzaSizes } from './queries'
import PizzaForm from './PizzaForm'

const App = () => {
  const { loading, error, data, client } = useQuery(getPizzaSizes)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  console.log({ data })
  // Todo: Handle case where app first loads and currentPizzaSize is empty string
  return (
    <div>
      <div>
        <select
          value={data.currentPizzaSize}
          onChange={e =>
            client.writeData({ data: { currentPizzaSize: e.target.value } })
          }
        >
          {data.__type.enumValues.map(pizza => (
            <option key={pizza.name} value={pizza.name}>
              {pizza.name}
            </option>
          ))}
        </select>
      </div>
      <PizzaForm name={data.currentPizzaSize} />
    </div>
  )
}

export default App
