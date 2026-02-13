import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react"
import config from "../config/config";
import { useNavigate } from "react-router";

ChartJS.register(ArcElement, Tooltip, Legend, Title);


export default function PieChart() {
    // const [loggedInUser, setLoggedInUser] = useState("")
    const [netExpenses, setNetExpenses] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    // Data
    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Rs',
                data: netExpenses,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    useEffect(() => {

        // Check login status
        const loggedInUser = localStorage.getItem("loggedInUser")

        if (!loggedInUser) {
            navigate("/login")
        }

        async function fetchData() {
            const encodedEmail = encodeURIComponent(loggedInUser as string)

            try {
                const response = await fetch(`${config.API_BASE_URL}/api/v1/transaction/getOverview/${encodedEmail}`);
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                const result = await response.json();
                const categories = result.map((item: any) => item.category)
                const netExpenses = result.map((item: any) => item.sum)

                setCategories(categories)
                setNetExpenses(netExpenses)
                setLoading(false)

            } catch (error) {
                const err = error as Error
                console.log(err.message);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse">
                Loading...
            </div>
        )
    }

    if (categories.length == 0 || netExpenses.length == 0) {
        return (
            <>
                No data
            </>
        )
    } else {
        return (
            <div className=" sm:w-96 self-center flex justify-center">
                <Pie data={data} options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Expense Overview',
                            font: {
                                size: 18
                            }
                        }
                    }
                }}
                />
            </div>
        )
    }



}