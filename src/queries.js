import { gql } from 'apollo-boost'

export const getPizzaSizesWithPrice = () => gql`
  {
    currentPizzaSize @client
    pizzaSizes {
      name
      basePrice
    }
  }
`
