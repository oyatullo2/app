import { Navigate, Outlet } from "react-router-dom";

export const ProductRouter = () => {
    const token = localStorage.getItem('token')
        return token ? <Outlet/> : <Navigate to="/login" />
}