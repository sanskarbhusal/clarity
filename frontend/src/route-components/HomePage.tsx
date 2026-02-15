import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router"
import PieChart from '../components/PieChart'
import Table from "../components/Table"
import { PieChartDataSyncContext, TableDataSyncContext } from "../Context"
import AddTransactionModal from "../components/AddTransactionModal"

function App() {
    const [showModal, setShowModal] = useState(false)
    const [needSync, setNeedSync] = useState(false)
    const navigate = useNavigate()

    // Check if user is logged in (my kaam chalaau auth logic) 
    useEffect(() => {
        const loggedInUser = localStorage.getItem("loggedInUser")
        if (!loggedInUser) {
            navigate("/login")
        }
    })

    return (
        <div className={`h-[100dvh] flex flex-col  items-center transition-all ${showModal ? "blur-3xl" : ""}`}>
            <div className="w-full flex justify-between mt-2 px-2 text-3xl font-extrabold font-mono text-[#125C38]">
                Clarity
                <button className="font-black text-4xl w-[2.95rem] text-[#125C38] bg-gray-100 border-[1px] border-solid border-gray-200 hover:bg-gray-200 active:scale-90 transition-all rounded-full pt-1 "
                    onClick={() => { setShowModal(true) }}
                >+</button>
                {showModal && createPortal(
                    //  
                    <AddTransactionModal closeModal={() => setShowModal(false)} triggerDataSync={() => setNeedSync(true)} />, document.body
                )}
            </div>
            <PieChartDataSyncContext value={{ needSync }}>
                <PieChart />
            </PieChartDataSyncContext >
            {/* This div is for gap */}
            <div className="min-h-5"></div>

            <TableDataSyncContext value={{ needSync }}>
                <Table />
            </TableDataSyncContext>
        </div>
    )
}

export default App