import { useState } from 'react'
import PieChart from './components/PieChart'
import Table from "./components/Table"

function App() {

  return (
    <div className='flex flex-col'>
      <PieChart />
      <Table />
    </div>
  )
}

export default App
