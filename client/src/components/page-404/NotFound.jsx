import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="d-flex align-items-center justify-content-center vh-100 text-center">
            <div>
                <h1 className="display-1 text-danger" style={{ fontSize: "8rem", fontWeight: "bold" }}>404</h1>
                <h2 className="mb-4"><strong>Page Not Found</strong></h2>
                <p className="mb-4"><strong>The page you are looking for does not exist.</strong></p>
                <Link to="/" className="btn btn-primary"><strong>Go Home</strong></Link>
            </div>
        </section>
    );
}