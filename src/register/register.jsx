import { useState, useEffect } from 'react'
import style from './register.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export const Register = () => {

    const [username, setUsername ] = useState('')
    const [password, setPassword ] = useState('')
    const [name, setName ] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(()=>{
        return localStorage.getItem('darkMode') === 'true';
    });
    
    useEffect(()=>{
        document.body.style.backgroundColor = isChecked ? 'black' : '#f4f4f4';
        localStorage.setItem('darkMode', isChecked);
    },[isChecked])

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };    

    const handReset = () => {
        if(username && password){
            setUsername('')
            setPassword('')
            setName('')
            setError('')
            navigate('/home')
            localStorage.setItem('token', 'Currect login !')
        }
        else{
            setError('Please enter username and password !');
            
            const interval = setTimeout(() => {
                setError('')
            },3000);
            
            return () => clearInterval(interval);
        }
       
    }

    const enterKey = (event) => {
        if(event.key === 'Enter'){
            handReset();
        }
    }

    const showButton = () => {
        setShowPassword(!showPassword);
        const interval = setTimeout(() => {
            setShowPassword(false);
        },10000)

        return () => clearInterval(interval);
    }

    return(
        <>
        <input
        type="checkbox"
        id='check' 
        className={style.check} 
        checked = {isChecked}
        onClick={handleCheck}
        />
        <div 
        className={style.check_div}
        style={{borderColor: isChecked ? 'white' : 'black',backgroundColor : isChecked ? 'white' : 'black'}}
        >
            <label htmlFor="check">
            <span 
            className={style.dot}
            style={{transform : isChecked ? 'translateX(22px)' : 'translateX(0px)', transition: 'all .5s ease'}}
            >
                {!isChecked ? <i id={style.moon} class="fa-solid fa-moon"></i>:<i id={style.sun}className="fa-solid fa-sun"></i>}
            </span>
            </label>
        </div>
        <div 
        className={style.main}
        style={{
            border: isChecked ? '2px solid white' : '2px solid white',
            backgroundColor : isChecked ? 'black' : 'white',
            boxShadow : isChecked ? '0px 0px 4px 3px white' : '0px 0px 4px 3px rgb(0,0,0,0.3)'
        }}
        >
            <h1 className={style.login}>Register</h1>

            <input type="text"
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={enterKey}
            className={style.input}
            />
            
            <input
            className={style.input} 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={enterKey}
            placeholder='Username'/>

            <div className={style.passwordAdnbutton}>
             <input
                className={style.passwordInput}
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={enterKey}
                placeholder="Password"
            />
            <button className={style.show} onClick={showButton}>
                {password && showPassword ? 'Hide' : 'Show'} 
            </button>
            </div>

            <div className={style.buttonAndRegister}>
                <div className={style.buttonsbox}>
                <button className={style.button} onClick={handReset}>
                Register
                </button>
                <span className={style.account}>Do you have an account? <Link className={style.link} to={'/login'}>Login</Link></span>
                </div>
                <p className={style.error}>{error}</p>
            </div>
        </div>
        </>
    )
}