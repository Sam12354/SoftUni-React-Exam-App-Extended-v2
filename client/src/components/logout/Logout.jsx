import { useEffect } from "react";
import { useLogout } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Logout() {
    const logout = useLogout();

    useEffect(() => {
        localStorage.removeItem('nickname');
        logout();

    }, [logout]);

    return <Navigate to="/" />;
}