import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import logo from './logo.svg'
import './App.css'

function App() {
  const { loading, error, data } = useQuery(gql`
    {
      pizzaSizes {
        name
      }
    }
  `)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  return (
    <div className="App">
      {console.log({ data })}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
