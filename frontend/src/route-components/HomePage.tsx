import PieChart from '../components/PieChart'
import Table from "../components/Table"

function App() {

    return (
        <div className='h-[100vh] flex flex-col gap-10 justify-center items-center ml-2 mr-2'>
            <PieChart />
            <Table />
        </div>
    )
}

export default App