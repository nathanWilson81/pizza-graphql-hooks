import { gql } from 'apollo-boost'

export const getPizzaSizes = gql`
  {
    currentPizzaSize @client
    __type(name: "PizzaSizes") {
      enumValues {
        name
      }
    }
  }
`

export const getPizzaDataBySize = gql`
  query($name: PizzaSizes) {
    pizzaSizeByName(name: $name) {
      name
      basePrice
      maxToppings
      toppings {
        defaultSelected
        topping {
          name
          price
        }
      }
    }
  }
`
