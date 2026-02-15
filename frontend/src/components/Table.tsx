import { useState, useEffect, useContext } from "react"
import { TableDataSyncContext } from "../Context"
import { format } from "date-fns"
import config from "../config/config"
import "../styles/table.css"


const EditButton = () => {

    return (
        <div className="group mx-1 py-2 px-[0.4rem] rounded-full inline"> <svg
            className="stroke-gray-400 w-5 group-hover:stroke-black inline transition-all duration-75"
            viewBox="0 0 32 32" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
        </svg>
        </div>
    )

}

export default function Table() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const needSync = useContext(TableDataSyncContext)

    useEffect(() => {

        const loggedInUser = localStorage.getItem("loggedInUser")
        const encodedEmail = encodeURIComponent(loggedInUser as string);

        // Fetch data for tabular view
        (async () => {

            try {
                const response = await fetch(`${config.API_BASE_URL}/api/v1/transaction/list?email=${encodedEmail}`);
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                const result = await response.json();

                setLoading(false)
                setData(result)

            } catch (error) {
                const err = error as Error
                console.log(err.message);
            }

        })();

    }, [needSync])

    if (loading) {
        return (
            <div className="animate-pulse">
                Loading Table...
            </div>
        )
    }

    if (data.length > 0) {

        let count = data.length
        const html = data.map((item: any) => {
            count--
            return (
                <tr key={item.id} style={{ backgroundColor: count % 2 == 0 ? "white" : "#E3F8ED" }} >
                    <td>Rs {item.amount}</td>
                    <td>{item.category}</td>
                    <td>{item.t_type}</td>
                    <td>{item.t_description}</td>
                    <td >{format(item.t_date, "MMM d, yyyy")}
                        <EditButton />
                    </td>
                </tr>
            )
        })

        return (
            <div className="overflow-auto mb-5 w-full sm:w-[90%] sm:max-w-[1100px] justify-center flex shadow-lg shadow-gray-500 border-[1px] border-[#125C38] border-solid">
                <table className="w-full">
                    <thead className="sticky top-0 h-10">
                        <tr className="bg-[#125C38] text-white font-bold text-md sm:text-lg text-center">
                            <td>Amount</td>
                            <td>Category</td>
                            <td>Type</td>
                            <td>Description</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody >
                        {html}
                    </tbody>
                </table>
            </div>
        )

    } else {
        return (
            <div>No data</div>
        )
    }
}