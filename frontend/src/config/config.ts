const environment: String = "production"

type Config = {
    API_BASE_URL: String
}

let config: Config

if (environment == "production") {
    config = {
        API_BASE_URL: "https://74.225.250.180:3000"
    }
} else {
    config = {
        API_BASE_URL: "http://localhost:3000"
    }
}

export default config