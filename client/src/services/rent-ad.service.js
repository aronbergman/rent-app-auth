import axios from "axios";

const API_URL = "http://localhost:8080/api/rent/";

class RentService {
    create(username, email) {
        return axios
            .post(API_URL + "create-ad", {
                username,
                email
            })
            .then(response => {
                return response.data;
            });
    }

    fetchAll() {
        return axios
            .post(API_URL + "fetch-all")
            .then(response => {
                return response.data;
            });
    }
}

export default new RentService()