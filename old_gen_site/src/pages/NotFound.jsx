import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="not-found-page">
            <div className="container not-found-content">
                <h1>404 error found, dai torniamo a Pianilungone a fare scorta</h1>

                <img className="not-found-img" src="/404.jpg" alt="error_found" />

                <Link className="back" to="/">
                    <h3>cliccami e torniamo alla Contea</h3>
                </Link>
            </div>
        </main>
    );
}
