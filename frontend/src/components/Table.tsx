import { useState, useEffect } from "react"
import { format } from "date-fns"
import config from "../config/config"
import "../styles/table.css"

export default function Table() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loggedInUser = localStorage.getItem("loggedInUser")
        const encodedEmail = encodeURIComponent(loggedInUser as string)

        async function fetchData() {
            try {
                const response = await fetch(`${config.API_BASE_URL}/api/v1/transaction/list?email=${encodedEmail}`);
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                const result = await response.json();
                setLoading(false)
                console.log(result)
                setData(result)

            } catch (error) {
                const err = error as Error
                console.log(err.message);
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="animate-pulse">
                Loading Table...
            </div>
        )
    }

    if (data.length > 0) {
        console.log(data)
        const html = data.map((item: any) => {
            return (
                <tr key={item.id} className="hover:bg-gray-300 hover:scale-105 transition-all">
                    <td>Rs {item.amount}</td>
                    <td>{item.category}</td>
                    <td>{item.t_type}</td>
                    <td>{item.t_description}</td>
                    <td>{format(item.t_date, "MMM d, yyyy")}</td>
                </tr>
            )
        })

        return (
            <div className="overflow-y-auto overflow-x-hidden w-full h-full mb-5 flex justify-center">
                <table className="bg-[#E3F8ED] sm:w-[80%]">
                    <thead className="sticky top-0">
                        <tr className="bg-[#125C38] text-white text-center">
                            <td>Amount</td>
                            <td>Category</td>
                            <td>Type</td>
                            <td>Description</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {html}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                No data.
            </div>
        )
    }
}