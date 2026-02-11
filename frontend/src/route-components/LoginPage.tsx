import { useState } from "react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="h-[100vh] flex flex-col bg-[#E3F8ED]">
            <h1 className="text-3xl font-extrabold font-mono text-[#125C38] m-3">
                Clarity
            </h1>
            <form className="relative top-[35%] w-[90%] sm:max-w-96 self-center flex flex-col gap-2 p-4 bg-[#125C38] text-white text-lg font-semibold border-[1px] border-solid border-gray-500 rounded-lg">
                <div className="flex justify-between gap-[3.65rem]">
                    <label htmlFor="email">Email</label>
                    <input
                        className="rounded-md w-full text-black p-1"
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex justify-between gap-6">
                    <label htmlFor="password">Password</label>
                    <input
                        className="rounded-md w-full text-black p-1"
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="bg-[#E3F8ED] w-20 rounded-lg text-black self-center mt-4 active:scale-95">Login</button>
            </form>
        </div>
    )
}