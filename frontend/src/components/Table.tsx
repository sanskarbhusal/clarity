import { useState, useEffect } from "react"
import config from "../config/config"
import "../table.css"

export default function Table() {
    const [data, setData] = useState([])

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
                console.log(result)
                setData(result)

            } catch (error) {
                const err = error as Error
                console.log(err.message);
            }
        }
        fetchData()
    }, [])

    if (data.length > 0) {
        console.log(data)
        const html = data.map((item: any) => {
            return (
                <tr key={item.id}>
                    <td>{item.amount}</td>
                    <td>{item.category}</td>
                    <td>{item.t_type}</td>
                    <td>{item.t_description}</td>
                    <td>{item.t_date}</td>
                </tr>
            )
        })
        return (
            <table className="bg-gray-200 sm:w-[70%] transition-all">
                <thead>
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
        )
    } else {
        return (
            <div className="animate-pulse">
                Loading table data...
            </div>
        )
    }
}