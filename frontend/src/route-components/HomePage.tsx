import PieChart from '../components/PieChart'
import Table from "../components/Table"

function App() {
    return (
        <div className='relative h-[100dvh] flex flex-col gap-10 justify-center items-center ml-2 mr-2'>
            <h1 className="absolute w-full top-0 m-3 text-3xl font-extrabold font-mono text-[#125C38]">
                Clarity
            </h1>
            <PieChart />
            <Table />
        </div>
    )
}

export default App