import { useState, type FormEvent } from "react";
import type { Asset, AssetCategory } from "../types/finance";

interface AssetFormProps {
    onAddAsset: (asset: Asset) => void;
}

function AssetForm({ onAddAsset }: AssetFormProps) {
    const [name, setName] = useState("");
    const [category, setCategory] =
        useState<AssetCategory>("cash");
    const [value, setValue] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const numericValue = Number(value);

        if (!name.trim() || numericValue <= 0) {
            return;
        }

        const newAsset: Asset = {
            id: crypto.randomUUID(),
            name: name.trim(),
            category,
            value: numericValue,
        };

        onAddAsset(newAsset);

        setName("");
        setCategory("cash");
        setValue("");
    }

    return (
        <form className="finance-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="asset-name">Asset name</label>

                <input
                    id="asset-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Savings account"
                />
            </div>

            <div className="form-field">
                <label htmlFor="asset-category">Category</label>

                <select
                    id="asset-category"
                    value={category}
                    onChange={(event) =>
                        setCategory(event.target.value as AssetCategory)
                    }
                >
                    <option value="cash">Cash</option>
                    <option value="investments">Investments</option>
                    <option value="property">Property</option>
                    <option value="vehicle">Vehicle</option>
                    <option value="retirement">Retirement</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="asset-value">Value</label>

                <input
                    id="asset-value"
                    type="number"
                    min="0"
                    step="0.01"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="0.00"
                />
            </div>

            <button className="form-submit-button" type="submit">
                Add Asset
            </button>
        </form>
    );
}

export default AssetForm;