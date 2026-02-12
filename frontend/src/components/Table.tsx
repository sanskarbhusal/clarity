import { useState, useEffect } from "react"
import config from "../config/config"
import "../table.css"

export default function Table() {
    const [data, setData] = useState([])
    const [loggedInUser, setLoggedInUser] = useState("")
    const [haveData, setHaveData] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const email = loggedInUser
            const encodedEmail = encodeURIComponent(email)
            try {
                const response = await fetch(`${config.API_BASE_URL}/api/v1/transaction/list?email=${encodedEmail}`);
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                const result = await response.json();

                if (!ignore) {
                    setData(result)
                }

            } catch (error) {
                const err = error as Error
                console.log(err.message);
            }

        }
        let ignore = false
        fetchData()
        return () => {
            ignore = true
        }
    }, [loggedInUser])

    if (haveData) {
        const html = data.map((item) => {
            return (
                <tr>
                    <td>data</td>
                    <td>data</td>
                    <td>data</td>
                    <td>data</td>
                    <td>data</td>
                </tr>
            )
        })
        return (
            <table className="bg-gray-200 w-full sm:w-[70%]">
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
            <div>
                No record found
                <button>Add Record</button>
            </div>
        )
    }
}