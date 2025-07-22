import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export default function Header() {
    // console.log("Header render");
    
    const { isAuthenticated } = useContext(AuthContext)
    // console.log(isAuthenticated);
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                <Link className="navbar-brand" to="/"><img src="/navbar-logo.svg" alt="Home" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars ms-1"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                            <Link className="nav-item nav-link" to="/catalog">Catalog</Link>
                            {isAuthenticated ? (
                                <>
                                <Link className="nav-item nav-link" to="/personalCatalog">Profile</Link>
                                <Link className="nav-item nav-link" to="/create">Sell</Link>
                                <Link className="nav-item nav-link" to="/change-password">Change Password</Link>
                                <Link className="nav-item nav-link" to="/logout">Logout</Link>
                                </>
                            ) : (
                                <>
                                <Link className="nav-item nav-link" to="/login">Login</Link>
                                <Link className="nav-item nav-link" to="/register">Register</Link>
                                </>
                            )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}