function NetWorthPage() {
    return (
        <section className="calculator-page">
            <div className="calculator-container">
                <header className="calculator-header">
                    <p className="eyebrow">Net Worth Calculator</p>

                    <h1>See your complete financial position.</h1>

                    <p className="calculator-description">
                        Add your assets and liabilities to calculate your current
                        net worth and better understand your overall financial health.
                    </p>
                </header>

                <div className="calculator-grid">
                    <section className="calculator-card">
                        <h2>Assets</h2>
                        <p>
                            Record the things you own, including cash, investments,
                            property, vehicles, and retirement accounts.
                        </p>
                    </section>

                    <section className="calculator-card">
                        <h2>Liabilities</h2>
                        <p>
                            Record the money you owe, including credit cards, student
                            loans, vehicle loans, mortgages, and personal loans.
                        </p>
                    </section>

                    <section className="calculator-card summary-card">
                        <p className="summary-label">Current Net Worth</p>
                        <p className="summary-value">$0.00</p>
                        <p className="summary-formula">
                            Total assets minus total liabilities
                        </p>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default NetWorthPage;