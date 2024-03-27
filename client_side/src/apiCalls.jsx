import axios from "axios"

export const loginCall = async (userCredentials , dispatch) =>{
    dispatch( { type : "LOGIN_START"})
    try{
        const user = await axios.post('auth/login', userCredentials);
        dispatch({ type : "LOGIN_SUCCESS" , payload : user.data})
    }
    catch(error)
    {
        dispatch({ type : "LOGIN_FAILURE", payload : error})
    }
}
