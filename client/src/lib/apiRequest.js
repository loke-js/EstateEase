import axios from "axios";
const apiRequest= axios.create({
    baseURL:"https://estateease-07ti.onrender.com/api",
    withCredentials:true,
})

export default apiRequest;