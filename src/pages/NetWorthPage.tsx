import { useState } from "react";
import AssetForm from "../components/AssetForm";
import type { Asset } from "../types/finance";

function NetWorthPage() {
    const [assets, setAssets] = useState<Asset[]>([]);

    function handleAddAsset(asset: Asset) {
        setAssets((currentAssets) => [...currentAssets, asset]);
    }

    const totalAssets = assets.reduce(
        (total, asset) => total + asset.value,
        0
    );

    const currentNetWorth = totalAssets;

    function formatCurrency(amount: number) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    }

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

                        <AssetForm onAddAsset={handleAddAsset} />

                        <div className="finance-entry-list">
                            {assets.length === 0 ? (
                                <p className="empty-state">
                                    No assets have been added yet.
                                </p>
                            ) : (
                                assets.map((asset) => (
                                    <div className="finance-entry" key={asset.id}>
                                        <div>
                                            <h3>{asset.name}</h3>
                                            <p>{asset.category}</p>
                                        </div>

                                        <strong>
                                            {formatCurrency(asset.value)}
                                        </strong>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="card-total">
                            <span>Total Assets</span>
                            <strong>{formatCurrency(totalAssets)}</strong>
                        </div>
                    </section>

                    <section className="calculator-card">
                        <h2>Liabilities</h2>

                        <p>
                            Record the money you owe, including credit cards, student
                            loans, vehicle loans, mortgages, and personal loans.
                        </p>

                        <p className="empty-state">
                            The liabilities form will be added next.
                        </p>
                    </section>

                    <section className="calculator-card summary-card">
                        <p className="summary-label">Current Net Worth</p>

                        <p className="summary-value">
                            {formatCurrency(currentNetWorth)}
                        </p>

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