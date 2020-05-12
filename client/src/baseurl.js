const baseUrl = () => {
    switch (process.env.NODE_ENV) {
        case "development": return 'http://localhost:5001'
        default: return 'https://bergman.bar'
    }
}

export default baseUrl;