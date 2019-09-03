import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getPizzaSizesWithPrice } from './queries'

function App() {
  const { loading, error, data, client } = useQuery(getPizzaSizesWithPrice())
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  // Todo: Handle case where app first loads and currentPizzaSize is empty string
  return (
    <div>
      <select
        value={data.currentPizzaSize}
        onChange={e =>
          client.writeData({ data: { currentPizzaSize: e.target.value } })
        }
      >
        {data.pizzaSizes.map(pizza => (
          <option key={pizza.name} value={pizza.name}>
            {`${pizza.name} - $${pizza.basePrice}`}
          </option>
        ))}
      </select>
    </div>
  )
}

export default App
