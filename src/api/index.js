import axios from "axios";

const mainUrl = axios.create({
    baseURL: "https://6645a462b8925626f8928085.mockapi.io/school/teachers",
});

export default mainUrl;
