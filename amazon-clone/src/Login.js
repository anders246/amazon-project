import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './styles/Login.css'
import { auth } from './db/firebase';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        // prevents page from refreshing
        e.preventDefault();
        // firebase stuff

        // confused about the differences in these lambda functions
        auth.signInWithEmailAndPassword(email, password).then(auth => 
        {
            navigate('/')
        }).catch(error => alert(error.message))

    }

    const signUp = e => {
        e.preventDefault();
        
        auth.createUserWithEmailAndPassword(email, password).then((auth) =>
        { 
            if (auth) {
                navigate('/');
                // if auth is sucessful, redirect
            }
        }).catch(error => alert(error.message))
    }

  return (
    <div className='login'>
        <Link to="/">
        <img className="login__logo" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt=''></img>
        </Link>

        <div className='login__container'>
            <h1>Sign in</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
                {/* e.target.value is what user typed in. as user types in, setEmail. then, the {email} field
                in value={email} is filled in from that method call. Confused here, why do we need e? */}
                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>

                <button type="submit" onClick={signIn}className='login__signInButton'>Sign in</button>
            </form>

            <p>
                By signing-in you agree to PSEUDO Amazon's
                Condition's of Use & Sale. Please see our 
                Privacy Notice, our Cookies Notice and our Interest
                based Ads Notice.
            </p>

            <button onClick={signUp} className='login__signUpButton'>Sign up</button>
        
        </div>

    </div>
  )
}

export default Login