import PieChart from '../components/PieChart'
import Table from "../components/Table"

function App() {
    return (
        <div className='relative h-[100dvh] flex flex-col gap-10 justify-around items-center ml-2 mr-2'>
            <h1 className=" absolute w-full top-0 flex justify-between m-3 text-3xl font-extrabold font-mono text-[#125C38]">
                Clarity
                <button className="font-black text-4xl mr-2 mt-[0.4rem] w-[2.95rem] text-[#125C38] bg-gray-100 border-[1px] border-solid border-gray-200 hover:bg-gray-200 active:scale-90 transition-all rounded-full pt-1 ">+</button>
            </h1>
            <PieChart />
            <Table />
        </div>
    )
}

export default App