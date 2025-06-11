import {useState} from 'react';
import {useAuth} from '../context/AuthContext';

export default function Authentication(props) {

    const {handleCloseModal} = props;

    const [isRegisteration, setIsRegisteration] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState(null);

    const {signUp, login} = useAuth();

    async function handleAutheticate() {
        if (!email || !password || !email.includes('@') || password.length < 8 || isAuthenticating) {
            alert('Please fill in all fields');
            return;
        }

        try {
            setIsAuthenticating(true);
            setError(null);
            if (isRegisteration) {
                // register
                await signUp(email, password);

            } else {
                // login
                await login(email, password);
            }

            handleCloseModal();
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        } finally {
            setIsAuthenticating(false);
        }

    } 

    return (
    <>
            <h2 className='sign-up-text'>{isRegisteration ? 'Sign Up' : 'Login'}</h2>
            <p>{isRegisteration?'Create an account':'Sign in to your account!'}</p>
            
            {error && <p className='error-text'>❌{error}</p>}
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' />
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='***' type='password' />
            <button onClick={handleAutheticate}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <hr />
            <div className='register-content'>
                <p>Dont have an account?</p>
                <button onClick={()=>{setIsRegisteration(!isRegisteration)}}><p>{!isRegisteration ? 'Sign Up' : 'Login'}</p></button>
            </div>
    </> 
    )
}
 