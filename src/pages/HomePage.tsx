import { Link } from "react-router-dom";

function HomePage() {
    return (
        <section className="home-page">
            <div className="home-hero">
                <p className="eyebrow">Financial clarity starts here.</p>

                <h1>
                    Understand your money.
                    <span> Build a stronger future.</span>
                </h1>

                <p className="home-description">
                    Track your assets, liabilities, income, expenses, and overall
                    financial progress through one intuitive platform.
                </p>

                <div className="home-actions">
                    <Link to="/net-worth" className="primary-button">
                        Calculate Net Worth
                    </Link>

                    <Link to="/budget" className="secondary-button">
                        Build a Budget
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HomePage;