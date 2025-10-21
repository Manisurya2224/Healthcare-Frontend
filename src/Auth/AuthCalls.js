import axios from "axios";
const PORT = "http://localhost:8080"; 
export const SignUpApi = async (payload) => {
    console.log("hit",payload);
    const URL = `${PORT}/api/signUp`;
    try {
        const data = await axios.post(URL, payload);
        return data;
    } catch (err) {
        return err.response;
       
    }
}
export const SignInApi = async (payload) => {
    const URL = `${PORT}/api/signIn`;
    try {
        const response = await axios.post(URL, payload);
        if (response.status === 200) {
           return response;
        }
    } catch (err) {
        console.log(err);
    }
}

