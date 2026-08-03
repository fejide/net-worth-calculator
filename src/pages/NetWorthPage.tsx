import { useEffect, useState } from "react";
import AssetForm from "../components/AssetForm";
import LiabilityForm from "../components/LiabilityForm";
import type { Asset, Liability } from "../types/finance";

const ASSETS_STORAGE_KEY = "financial-clarity-assets";
const LIABILITIES_STORAGE_KEY = "financial-clarity-liabilities";

function loadAssets(): Asset[] {
    try {
        const savedAssets = localStorage.getItem(ASSETS_STORAGE_KEY);

        if (!savedAssets) {
            return [];
        }

        return JSON.parse(savedAssets) as Asset[];
    } catch {
        return [];
    }
}

function loadLiabilities(): Liability[] {
    try {
        const savedLiabilities = localStorage.getItem(
            LIABILITIES_STORAGE_KEY
        );

        if (!savedLiabilities) {
            return [];
        }

        return JSON.parse(savedLiabilities) as Liability[];
    } catch {
        return [];
    }
}

function NetWorthPage() {
    const [assets, setAssets] = useState<Asset[]>(loadAssets);

    const [liabilities, setLiabilities] =
        useState<Liability[]>(loadLiabilities);

    const [editingAsset, setEditingAsset] =
        useState<Asset | null>(null);

    const [editingLiability, setEditingLiability] =
        useState<Liability | null>(null);

    useEffect(() => {
        localStorage.setItem(
            ASSETS_STORAGE_KEY,
            JSON.stringify(assets)
        );
    }, [assets]);

    useEffect(() => {
        localStorage.setItem(
            LIABILITIES_STORAGE_KEY,
            JSON.stringify(liabilities)
        );
    }, [liabilities]);

    function handleAddAsset(asset: Asset) {
        setAssets((currentAssets) => [
            ...currentAssets,
            asset,
        ]);
    }

    function handleUpdateAsset(updatedAsset: Asset) {
        setAssets((currentAssets) =>
            currentAssets.map((asset) =>
                asset.id === updatedAsset.id
                    ? updatedAsset
                    : asset
            )
        );

        setEditingAsset(null);
    }

    function handleStartAssetEdit(asset: Asset) {
        setEditingAsset(asset);
    }

    function handleCancelAssetEdit() {
        setEditingAsset(null);
    }

    function handleAddLiability(liability: Liability) {
        setLiabilities((currentLiabilities) => [
            ...currentLiabilities,
            liability,
        ]);
    }

    function handleUpdateLiability(
        updatedLiability: Liability
    ) {
        setLiabilities((currentLiabilities) =>
            currentLiabilities.map((liability) =>
                liability.id === updatedLiability.id
                    ? updatedLiability
                    : liability
            )
        );

        setEditingLiability(null);
    }

    function handleStartLiabilityEdit(
        liability: Liability
    ) {
        setEditingLiability(liability);
    }

    function handleCancelLiabilityEdit() {
        setEditingLiability(null);
    }

    function handleDeleteAsset(assetId: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this asset?"
        );

        if (!confirmed) {
            return;
        }

        setAssets((currentAssets) =>
            currentAssets.filter(
                (asset) => asset.id !== assetId
            )
        );

        if (editingAsset?.id === assetId) {
            setEditingAsset(null);
        }
    }

    function handleDeleteLiability(
        liabilityId: string
    ) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this liability?"
        );

        if (!confirmed) {
            return;
        }

        setLiabilities((currentLiabilities) =>
            currentLiabilities.filter(
                (liability) =>
                    liability.id !== liabilityId
            )
        );

        if (editingLiability?.id === liabilityId) {
            setEditingLiability(null);
        }
    }

    const totalAssets = assets.reduce(
        (total, asset) => total + asset.value,
        0
    );

    const totalLiabilities = liabilities.reduce(
        (total, liability) =>
            total + liability.value,
        0
    );

    const currentNetWorth =
        totalAssets - totalLiabilities;

    const totalEntries =
        assets.length + liabilities.length;

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
                    <p className="eyebrow">
                        Net Worth Calculator
                    </p>

                    <h1>
                        See your complete financial position.
                    </h1>

                    <p className="calculator-description">
                        Add your assets and liabilities to
                        calculate your current net worth and
                        better understand your overall
                        financial health.
                    </p>
                </header>

                <section
                    className="financial-summary-grid"
                    aria-label="Financial summary"
                >
                    <article className="financial-summary-card">
                        <p className="financial-summary-label">
                            Total Assets
                        </p>

                        <p className="financial-summary-amount">
                            {formatCurrency(totalAssets)}
                        </p>

                        <p className="financial-summary-detail">
                            {assets.length}{" "}
                            {assets.length === 1
                                ? "asset"
                                : "assets"}
                        </p>
                    </article>

                    <article className="financial-summary-card">
                        <p className="financial-summary-label">
                            Total Liabilities
                        </p>

                        <p className="financial-summary-amount">
                            {formatCurrency(
                                totalLiabilities
                            )}
                        </p>

                        <p className="financial-summary-detail">
                            {liabilities.length}{" "}
                            {liabilities.length === 1
                                ? "liability"
                                : "liabilities"}
                        </p>
                    </article>

                    <article
                        className={`financial-summary-card net-worth-summary-card ${
                            currentNetWorth < 0
                                ? "negative-net-worth"
                                : "positive-net-worth"
                        }`}
                    >
                        <p className="financial-summary-label">
                            Current Net Worth
                        </p>

                        <p className="financial-summary-amount">
                            {formatCurrency(
                                currentNetWorth
                            )}
                        </p>

                        <p className="financial-summary-detail">
                            Assets minus liabilities
                        </p>
                    </article>

                    <article className="financial-summary-card">
                        <p className="financial-summary-label">
                            Financial Entries
                        </p>

                        <p className="financial-summary-amount">
                            {totalEntries}
                        </p>

                        <p className="financial-summary-detail">
                            {assets.length}{" "}
                            {assets.length === 1
                                ? "asset"
                                : "assets"}
                            {" • "}
                            {liabilities.length}{" "}
                            {liabilities.length === 1
                                ? "liability"
                                : "liabilities"}
                        </p>
                    </article>
                </section>

                <div className="calculator-grid">
                    <section className="calculator-card">
                        <h2>Assets</h2>

                        <p>
                            Record the things you own,
                            including cash, investments,
                            property, vehicles, and retirement
                            accounts.
                        </p>

                        <AssetForm
                            onAddAsset={handleAddAsset}
                            onUpdateAsset={handleUpdateAsset}
                            editingAsset={editingAsset}
                            onCancelEdit={
                                handleCancelAssetEdit
                            }
                        />

                        <div className="finance-entry-list">
                            {assets.length === 0 ? (
                                <p className="empty-state">
                                    No assets have been added
                                    yet.
                                </p>
                            ) : (
                                assets.map((asset) => (
                                    <div
                                        className="finance-entry"
                                        key={asset.id}
                                    >
                                        <div>
                                            <h3>
                                                {asset.name}
                                            </h3>

                                            <p>
                                                {asset.category}
                                            </p>
                                        </div>

                                        <div className="entry-actions">
                                            <strong>
                                                {formatCurrency(
                                                    asset.value
                                                )}
                                            </strong>

                                            <button
                                                className="edit-entry-button"
                                                type="button"
                                                onClick={() =>
                                                    handleStartAssetEdit(
                                                        asset
                                                    )
                                                }
                                                aria-label={`Edit ${asset.name}`}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-entry-button"
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteAsset(
                                                        asset.id
                                                    )
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

                            <strong>
                                {formatCurrency(
                                    totalAssets
                                )}
                            </strong>
                        </div>
                    </section>

                    <section className="calculator-card">
                        <h2>Liabilities</h2>

                        <p>
                            Record the money you owe,
                            including credit cards, student
                            loans, vehicle loans, mortgages,
                            and personal loans.
                        </p>

                        <LiabilityForm
                            onAddLiability={
                                handleAddLiability
                            }
                            onUpdateLiability={
                                handleUpdateLiability
                            }
                            editingLiability={
                                editingLiability
                            }
                            onCancelEdit={
                                handleCancelLiabilityEdit
                            }
                        />

                        <div className="finance-entry-list">
                            {liabilities.length === 0 ? (
                                <p className="empty-state">
                                    No liabilities have been
                                    added yet.
                                </p>
                            ) : (
                                liabilities.map(
                                    (liability) => (
                                        <div
                                            className="finance-entry"
                                            key={
                                                liability.id
                                            }
                                        >
                                            <div>
                                                <h3>
                                                    {
                                                        liability.name
                                                    }
                                                </h3>

                                                <p>
                                                    {
                                                        liability.category
                                                    }
                                                </p>
                                            </div>

                                            <div className="entry-actions">
                                                <strong>
                                                    {formatCurrency(
                                                        liability.value
                                                    )}
                                                </strong>

                                                <button
                                                    className="edit-entry-button"
                                                    type="button"
                                                    onClick={() =>
                                                        handleStartLiabilityEdit(
                                                            liability
                                                        )
                                                    }
                                                    aria-label={`Edit ${liability.name}`}
                                                >
                                                    Edit
                                                </button>

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
                                    )
                                )
                            )}
                        </div>

                        <div className="card-total">
                            <span>
                                Total Liabilities
                            </span>

                            <strong>
                                {formatCurrency(
                                    totalLiabilities
                                )}
                            </strong>
                        </div>
                    </section>

                    <section className="calculator-card summary-card">
                        <p className="summary-label">
                            Current Net Worth
                        </p>

                        <p className="summary-value">
                            {formatCurrency(
                                currentNetWorth
                            )}
                        </p>

                        <p className="summary-formula">
                            {formatCurrency(totalAssets)} in
                            assets minus{" "}
                            {formatCurrency(
                                totalLiabilities
                            )}{" "}
                            in liabilities
                        </p>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default NetWorthPage;