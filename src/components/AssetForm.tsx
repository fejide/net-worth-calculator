import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import type {
    Asset,
    AssetCategory,
} from "../types/finance";

interface AssetFormProps {
    onAddAsset: (asset: Asset) => void;
    onUpdateAsset: (asset: Asset) => void;
    editingAsset: Asset | null;
    onCancelEdit: () => void;
}

function AssetForm({
    onAddAsset,
    onUpdateAsset,
    editingAsset,
    onCancelEdit,
}: AssetFormProps) {
    const [name, setName] = useState("");
    const [category, setCategory] =
        useState<AssetCategory>("cash");
    const [value, setValue] = useState("");

    useEffect(() => {
        if (editingAsset) {
            setName(editingAsset.name);
            setCategory(editingAsset.category);
            setValue(String(editingAsset.value));
            return;
        }

        setName("");
        setCategory("cash");
        setValue("");
    }, [editingAsset]);

    function resetForm() {
        setName("");
        setCategory("cash");
        setValue("");
    }

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const numericValue = Number(value);

        if (!name.trim() || numericValue <= 0) {
            return;
        }

        if (editingAsset) {
            onUpdateAsset({
                ...editingAsset,
                name: name.trim(),
                category,
                value: numericValue,
            });

            resetForm();
            return;
        }

        const newAsset: Asset = {
            id: crypto.randomUUID(),
            name: name.trim(),
            category,
            value: numericValue,
        };

        onAddAsset(newAsset);
        resetForm();
    }

    function handleCancel() {
        resetForm();
        onCancelEdit();
    }

    return (
        <form
            className="finance-form"
            onSubmit={handleSubmit}
        >
            <div className="form-field">
                <label htmlFor="asset-name">
                    Asset name
                </label>

                <input
                    id="asset-name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    placeholder="Savings account"
                />
            </div>

            <div className="form-field">
                <label htmlFor="asset-category">
                    Category
                </label>

                <select
                    id="asset-category"
                    value={category}
                    onChange={(event) =>
                        setCategory(
                            event.target
                                .value as AssetCategory
                        )
                    }
                >
                    <option value="cash">
                        Cash
                    </option>

                    <option value="investments">
                        Investments
                    </option>

                    <option value="property">
                        Property
                    </option>

                    <option value="vehicle">
                        Vehicle
                    </option>

                    <option value="retirement">
                        Retirement
                    </option>

                    <option value="other">
                        Other
                    </option>
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="asset-value">
                    Value
                </label>

                <input
                    id="asset-value"
                    type="number"
                    min="0"
                    step="0.01"
                    value={value}
                    onChange={(event) =>
                        setValue(event.target.value)
                    }
                    placeholder="0.00"
                />
            </div>

            <button
                className="form-submit-button"
                type="submit"
            >
                {editingAsset
                    ? "Save Asset Changes"
                    : "Add Asset"}
            </button>

            {editingAsset && (
                <button
                    className="cancel-edit-button"
                    type="button"
                    onClick={handleCancel}
                >
                    Cancel Edit
                </button>
            )}
        </form>
    );
}

export default AssetForm;