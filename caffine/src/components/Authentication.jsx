import {useState} from 'react';

export default function Authentication() {

    const [isRegisteration, setIsRegisteration] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    async function handleAutheticate() {

    } 

    return (
    <>
            <h2 className='sign-up-text'>{isRegisteration ? 'Sign Up' : 'Login'}</h2>
            <p>Sign in to your account!</p>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' />
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='***' type='password' />
            <button onClick={handleAutheticate}><p>Submit</p></button>
            <hr />
            <div className='register-content'>
                <p>Dont have an account?</p>
                <button onClick={()=>{setIsRegisteration(!isRegisteration)}}><p>{!isRegisteration ? 'Sign Up' : 'Login'}</p></button>
            </div>
    </> 
    )
}
 