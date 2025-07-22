import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <header className="masthead">
            <img src="/images/header-bg.jpg" alt="Background" className="header-img" />
                <div className="container">
                    <div className="masthead-subheading">Step Into Our Shopping Haven</div>
                    <div className="masthead-heading text-uppercase">Gear Up For Big Deals!</div>
                    <Link className="btn btn-primary btn-xl text-uppercase" to="/catalog">Discover Top Deals</Link>
                </div>
            </header>
        </>
    )
}