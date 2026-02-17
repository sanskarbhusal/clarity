import { useState, useEffect } from "react"
import config from "../config/config"

export default function AIContent() {
    const [content, setContent] = useState("AI thinking...")

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${config.API_BASE_URL}/`)

                if (!response.ok) {
                    throw new Error("Something went wrong.")
                }

                const result = await response.json()
                setContent(result.AIGeneratedContent)

            } catch (error) {
                const err = error as Error
                console.log(err.message)
            }
        })()
    }, [content])

    return (
        <div>
            {
                content ? content : ""
            }
        </div>
    )
}