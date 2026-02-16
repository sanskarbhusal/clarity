import { useState, useEffect, useContext } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { TableDataSyncContext } from "../Context"
import EditButton from "./EditButton"
import { format } from "date-fns"
import config from "../config/config"
import "../styles/table.css"


type TableProps = {
    applyBlur: (bool: boolean) => void
}

export default function Table({ applyBlur }: TableProps) {

    // state hooks
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    // context hooks
    const needSync = useContext(TableDataSyncContext)

    // routing hook
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {

        const loggedInUser = localStorage.getItem("loggedInUser")
        const encodedEmail = encodeURIComponent(loggedInUser as string);

        // Fetch data for tabular view
        (async () => {

            try {
                let category = searchParams.get("category")

                if (!category) {
                    category = ""
                }

                const response = await fetch(`${config.API_BASE_URL}/api/v1/transaction/list?email=${encodedEmail}&category=${category}`);

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
                        <EditButton correspondingData={item} />
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
                            <td>Category
                                <select className="rounded-2xl ml-2 w-fit h-7 text-black text-sm font-normal p-1 bg-gray-100 "
                                    onChange={e => {
                                        navigate(`/?category=${e.target.value}`)
                                    }}
                                >
                                    <option></option>
                                    <option value="food">
                                        food
                                    </option>
                                    <option value="clothing">
                                        clothing
                                    </option>
                                    <option value="rent">
                                        rent
                                    </option>
                                    <option value="entertainment">
                                        entertainment
                                    </option>
                                    <option value="investment">
                                        investment
                                    </option>
                                    <option value="transportation">
                                        transportation
                                    </option>
                                    <option value="borrowed">
                                        borrowed
                                    </option>
                                </select>
                            </td>
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