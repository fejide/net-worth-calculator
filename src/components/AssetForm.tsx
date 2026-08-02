
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
    const [errorMessage, setErrorMessage] =
        useState("");

    useEffect(() => {
        setErrorMessage("");

        if (editingAsset) {
            setName(editingAsset.name);
            setCategory(editingAsset.category);
            setValue(String(editingAsset.value));
            return;
        }

        resetForm();
    }, [editingAsset]);

    function resetForm() {
        setName("");
        setCategory("cash");
        setValue("");
        setErrorMessage("");
    }

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const trimmedName = name.trim();
        const numericValue = Number(value);

        if (!trimmedName) {
            setErrorMessage(
                "Enter a name for this asset."
            );
            return;
        }

        if (!value || Number.isNaN(numericValue)) {
            setErrorMessage(
                "Enter a valid value for this asset."
            );
            return;
        }

        if (numericValue <= 0) {
            setErrorMessage(
                "The asset value must be greater than zero."
            );
            return;
        }

        setErrorMessage("");

        if (editingAsset) {
            onUpdateAsset({
                ...editingAsset,
                name: trimmedName,
                category,
                value: numericValue,
            });

            resetForm();
            return;
        }

        const newAsset: Asset = {
            id: crypto.randomUUID(),
            name: trimmedName,
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
            noValidate
        >
            <div className="form-field">
                <label htmlFor="asset-name">
                    Asset name
                </label>

                <input
                    id="asset-name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        setErrorMessage("");
                    }}
                    placeholder="Savings account"
                    aria-describedby={
                        errorMessage
                            ? "asset-form-error"
                            : undefined
                    }
                    aria-invalid={
                        errorMessage ? "true" : "false"
                    }
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
                    onChange={(event) => {
                        setValue(event.target.value);
                        setErrorMessage("");
                    }}
                    placeholder="0.00"
                    aria-describedby={
                        errorMessage
                            ? "asset-form-error"
                            : undefined
                    }
                    aria-invalid={
                        errorMessage ? "true" : "false"
                    }
                />
            </div>

            {errorMessage && (
                <p
                    id="asset-form-error"
                    className="form-error-message"
                    role="alert"
                >
                    {errorMessage}
                </p>
            )}

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