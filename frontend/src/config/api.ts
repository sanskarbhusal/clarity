const environment: String = "local"

let url

if (environment == "production") {
    url = {
        BASE_URL: ""
    }
} else {
    url = {
        BASE_URL: "http://localhost:3000"
    }
}

export default url

