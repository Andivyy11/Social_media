import './login.css'
import React from 'react'
import {loginCall} from '../../apiCalls'
import { Authcontext } from '../../context/AuthContext';
import { Link} from 'react-router-dom'

export default function Login()
{
    const email = React.useRef();
    const password = React.useRef();
    const { user, isFetching, error, dispatch } = React.useContext(Authcontext)

    function handleClick(e){
        e.preventDefault();
        loginCall({ email:email.current.value , password:password.current.value } , dispatch );
    }
    console.log(user)
    return (
    <div className='formContainer'>
        <form className='form' onSubmit={handleClick}>
            <input placeholder='Email' type="email" required ref={email}></input>
            <input placeholder='Password' type="password" required minLength="6" ref={password}></input>
            <button className='logInButton' disabled={isFetching}>{ isFetching ? "Loading..." : "Log In"}</button>
            <span className='forgotText'>Forgot Password ?</span>
            <Link to='/register' style={{textDecoration:"none",width:"100%",textAlign:"center"}}>
            <button className='newAccountButton'>Create New Account</button>
            </Link>
        </form>
    </div>
    )
}