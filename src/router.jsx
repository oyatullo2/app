import { Route, Routes, useNavigate } from 'react-router-dom'
import { ProductRouter } from './prodectRouter'
import { Login } from './login'
import { Register } from './register/register'
import { Home } from './home'
import { useEffect } from 'react'
export const Router = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    useEffect(() => {
        if(!token){
            navigate('/login')
        }
        else{
            navigate('/home')
        }
    },[])

    return(
        <>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<ProductRouter/>}>
                <Route path='home' element={<Home/>}/>
            </Route>
        </Routes>
        </>
    )
}