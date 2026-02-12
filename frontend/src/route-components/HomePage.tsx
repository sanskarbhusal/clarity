import { useState } from "react"
import { createPortal } from "react-dom"
import PieChart from '../components/PieChart'
import Table from "../components/Table"
import AddTransactionModal from "../components/AddTransactionModal"

function App() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className={`h-[100dvh] flex flex-col gap-10 justify-around items-center ml-2 mr-2 transition-all ${showModal ? "blur-3xl" : ""}`}>
            <h1 className="w-full top-0 flex justify-between m-3 text-3xl font-extrabold font-mono text-[#125C38]">
                Clarity
                <button className="font-black text-4xl mr-2 mt-[0.4rem] w-[2.95rem] text-[#125C38] bg-gray-100 border-[1px] border-solid border-gray-200 hover:bg-gray-200 active:scale-90 transition-all rounded-full pt-1 "
                    onClick={() => { setShowModal(true) }}
                >+</button>
                {showModal && createPortal(
                    <AddTransactionModal closeModal={() => setShowModal(false)} />, document.body
                )}
            </h1>
            <PieChart />
            <Table />
        </div>
    )
}

export default App