import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Navigate } from "react-router-dom"


export default function RouteGuard({children}){
    const { isAuthenticated } = useContext(AuthContext)
    // console.log(isAuthenticated);
    

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }

    return (
        <>
            {children}
        </>
    )
}