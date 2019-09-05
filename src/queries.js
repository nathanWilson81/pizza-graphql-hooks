import { gql } from 'apollo-boost'

export const PIZZA_SIZE_OPTIONS = gql`
  {
    __type(name: "PizzaSizes") {
      enumValues {
        name
      }
    }
  }
`

export const PIZZA_DATA_BY_SIZE = gql`
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
