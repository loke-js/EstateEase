import axios from "axios";
const apiRequest= axios.create({
    baseURL:"https://estateease-backend.onrender.com/api",
    withCredentials:true,
})

export default apiRequest;
