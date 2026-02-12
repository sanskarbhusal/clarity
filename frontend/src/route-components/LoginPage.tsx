import { useState } from "react"
import { useNavigate, Link } from "react-router"
import config from "../config/config"

async function handleLogin(email: string, password: string, setErrorMsg: any, navigate: any) {
    try {
        const response = await fetch(`${config.API_BASE_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        if (response.status == 500) {
            throw new Error("Backend Padkyo!")
        }
        if (!response.ok) {
            const resBody = await response.json()
            throw new Error(resBody.message)
        }

        localStorage.setItem("loggedInUser", email)
        navigate("/")

    } catch (error) {
        const err = error as Error
        setErrorMsg(err.message)
    }
}

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()
    return (
        <div className="h-[100vh] flex flex-col bg-[#E3F8ED]">
            <h1 className="text-3xl font-extrabold font-mono text-[#125C38] m-3">
                Clarity
            </h1>
            <span className="relative h-3 top-[28.5%] text-red-500 text-xl self-center font-normal">{errorMsg}</span>
            <form className="relative top-[30%] w-[90%] sm:max-w-96 self-center flex flex-col gap-2 p-4 bg-[#125C38] text-white text-lg font-semibold border-[1px] border-solid border-gray-500 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-3">
                    Welcome Back
                </h2>
                <div className="flex justify-between gap-[3.65rem]">
                    <label htmlFor="email">Email</label>
                    <input
                        className="rounded-md w-full text-black p-1"
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={() => {
                            setErrorMsg("")
                        }}
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
                        onFocus={() => {
                            setErrorMsg("")
                        }}
                    />
                </div>
                <button className="bg-[#E3F8ED] w-20 rounded-lg text-black self-center mt-4 active:scale-95"
                    onClick={(e) => {
                        e.preventDefault()
                        handleLogin(email, password, setErrorMsg, navigate)
                    }}>
                    Login
                </button>
            </form>
            <Link
                className="relative top-[31%] self-center text-[#125C38] hover:underline "
                to="/signup">
                Don't have an account?
            </Link>
        </div>
    )
}