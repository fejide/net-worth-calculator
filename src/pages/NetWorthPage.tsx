import { useState } from "react";
import AssetForm from "../components/AssetForm";
import LiabilityForm from "../components/LiabilityForm";
import type { Asset, Liability } from "../types/finance";

function NetWorthPage() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [liabilities, setLiabilities] = useState<Liability[]>([]);

    function handleAddAsset(asset: Asset) {
        setAssets((currentAssets) => [...currentAssets, asset]);
    }

    function handleAddLiability(liability: Liability) {
        setLiabilities((currentLiabilities) => [
            ...currentLiabilities,
            liability,
        ]);
    }

    function handleDeleteAsset(assetId: string) {
        setAssets((currentAssets) =>
            currentAssets.filter((asset) => asset.id !== assetId)
        );
    }

    function handleDeleteLiability(liabilityId: string) {
        setLiabilities((currentLiabilities) =>
            currentLiabilities.filter(
                (liability) => liability.id !== liabilityId
            )
        );
    }

    const totalAssets = assets.reduce(
        (total, asset) => total + asset.value,
        0
    );

    const totalLiabilities = liabilities.reduce(
        (total, liability) => total + liability.value,
        0
    );

    const currentNetWorth = totalAssets - totalLiabilities;

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
                                    <div
                                        className="finance-entry"
                                        key={asset.id}
                                    >
                                        <div>
                                            <h3>{asset.name}</h3>
                                            <p>{asset.category}</p>
                                        </div>

                                        <div className="entry-actions">
                                            <strong>
                                                {formatCurrency(asset.value)}
                                            </strong>

                                            <button
                                                className="delete-entry-button"
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteAsset(asset.id)
                                                }
                                                aria-label={`Delete ${asset.name}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
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

                        <LiabilityForm
                            onAddLiability={handleAddLiability}
                        />

                        <div className="finance-entry-list">
                            {liabilities.length === 0 ? (
                                <p className="empty-state">
                                    No liabilities have been added yet.
                                </p>
                            ) : (
                                liabilities.map((liability) => (
                                    <div
                                        className="finance-entry"
                                        key={liability.id}
                                    >
                                        <div>
                                            <h3>{liability.name}</h3>
                                            <p>{liability.category}</p>
                                        </div>

                                        <div className="entry-actions">
                                            <strong>
                                                {formatCurrency(
                                                    liability.value
                                                )}
                                            </strong>

                                            <button
                                                className="delete-entry-button"
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteLiability(
                                                        liability.id
                                                    )
                                                }
                                                aria-label={`Delete ${liability.name}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="card-total">
                            <span>Total Liabilities</span>
                            <strong>
                                {formatCurrency(totalLiabilities)}
                            </strong>
                        </div>
                    </section>

                    <section className="calculator-card summary-card">
                        <p className="summary-label">Current Net Worth</p>

                        <p className="summary-value">
                            {formatCurrency(currentNetWorth)}
                        </p>

                        <p className="summary-formula">
                            {formatCurrency(totalAssets)} in assets minus{" "}
                            {formatCurrency(totalLiabilities)} in liabilities
                        </p>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default NetWorthPage;