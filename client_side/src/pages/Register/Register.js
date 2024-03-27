import './register.css'
import { useRef } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Register()
{
    const email=useRef();
    const username=useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const navi = useNavigate();

    async function handleClick(e){
        console.log('click')
        e.preventDefault();
        console.log(password.current.value, passwordAgain.current.value)
        if(password.current.value !== passwordAgain.current.value)
           passwordAgain.current.setCustomValidity("Passwords don't match")
        else 
        {
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }
            try{
                await axios.post('/auth/register' , user);
                navi('/');
            }
            catch(err){
                console.log('some error')
            }
        }
    }
    return (
    <div className='formContainer'>
        <form className='form' onSubmit={handleClick}>
            <input placeholder='Email' type='email' required ref={email}></input>
            <input placeholder='Username' required ref={username}></input>
            <input placeholder='Password' type="password" required ref={password}></input>
            <input placeholder='Confirm Password' type='password' ref={passwordAgain}></input>
            <button className='newAccountButton'>Register</button>
        </form>
    </div>
    )
}