import { useState } from "react"
import config from "../config/config"

async function handleClick({ amount, t_type, category, t_description, closeModal }: any) {

    const email = localStorage.getItem("loggedInUser")

    try {
        const response = await fetch(`${config.API_BASE_URL}/api/v1/transaction/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, amount, t_type, category, t_description, t_date: new Date() })
        })

        const result = await response.json()

        if (response.status == 500) {
            throw new Error("Backend Padkyo!")
        }

        if (!response.ok) {
            throw new Error(result.message)
        }
        closeModal()

    } catch (error) {
        const err = error as Error
        console.log(err.message)
    }
}

export default function AddTransactionModal({ closeModal }: any) {

    const [amount, setAmount] = useState("")
    const [t_type, setType] = useState("")
    const [category, setCategory] = useState("")
    const [t_description, setDescription] = useState("")

    return (
        <form className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl w-96 h-fit flex flex-col gap-3 p-4 pl-6 pr-6 bg-[#E3F8ED] text-lg font-semibold border-[1px] border-solid border-green-300">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-3 text-[#125C38]">
                    Transaction Details
                </h2>
                <button onClick={closeModal} className="font-black font-mono text-2xl relative bottom-2">X</button>
            </div>
            <div className="flex justify-between gap-[3.15rem] text-md mb-1">
                <label className="self-center">Amount</label>
                <input
                    className="rounded-2xl w-1/2 h-9 text-black text-sm font-normal p-1 "
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
            </div>

            <div className="flex justify-between gap-[3.15rem] text-md mb-1">
                <label className="self-center">Type</label>
                <select className="rounded-2xl w-1/2 h-9 text-black text-sm font-normal p-1 bg-white "
                    value={t_type}
                    onChange={e => setType(e.target.value)}
                >
                    <option></option>
                    <option value="expense">
                        expense
                    </option>
                    <option value="income">
                        income
                    </option>
                </select>
            </div>

            <div className="flex justify-between gap-[3.15rem] text-md mb-1">
                <label className="self-center">Category</label>
                <select className="rounded-2xl w-1/2 h-9 text-black text-sm font-normal p-1 bg-white "
                    value={category}
                    onChange={e => setCategory(e.target.value)}
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
            </div>
            <div className="flex flex-col justify-between gap-4 text-md">
                <textarea
                    className="rounded-2xl w-full max-h-48 text-black text-sm font-normal p-1"
                    placeholder="Description"
                    rows={10}
                    value={t_description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <button className="bg-[#125C38] w-20 rounded-lg p-1 text-white self-center mt-4 active:scale-95"
                onClick={(e) => {
                    handleClick({ amount, t_type, category, t_description, closeModal })

                    // Trigger refetch in PieChar and Table component
                }}>
                Add
            </button>
        </form >
    )
}