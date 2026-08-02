import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import type {
    Liability,
    LiabilityCategory,
} from "../types/finance";

interface LiabilityFormProps {
    onAddLiability: (liability: Liability) => void;
    onUpdateLiability: (liability: Liability) => void;
    editingLiability: Liability | null;
    onCancelEdit: () => void;
}

function LiabilityForm({
    onAddLiability,
    onUpdateLiability,
    editingLiability,
    onCancelEdit,
}: LiabilityFormProps) {
    const [name, setName] = useState("");
    const [category, setCategory] =
        useState<LiabilityCategory>("credit-card");
    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] =
        useState("");

    useEffect(() => {
        setErrorMessage("");

        if (editingLiability) {
            setName(editingLiability.name);
            setCategory(editingLiability.category);
            setValue(String(editingLiability.value));
            return;
        }

        resetForm();
    }, [editingLiability]);

    function resetForm() {
        setName("");
        setCategory("credit-card");
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
                "Enter a name for this liability."
            );
            return;
        }

        if (!value || Number.isNaN(numericValue)) {
            setErrorMessage(
                "Enter a valid balance for this liability."
            );
            return;
        }

        if (numericValue <= 0) {
            setErrorMessage(
                "The liability balance must be greater than zero."
            );
            return;
        }

        setErrorMessage("");

        if (editingLiability) {
            const updatedLiability: Liability = {
                ...editingLiability,
                name: trimmedName,
                category,
                value: numericValue,
            };

            onUpdateLiability(updatedLiability);
            resetForm();
            return;
        }

        const newLiability: Liability = {
            id: crypto.randomUUID(),
            name: trimmedName,
            category,
            value: numericValue,
        };

        onAddLiability(newLiability);
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
                <label htmlFor="liability-name">
                    Liability name
                </label>

                <input
                    id="liability-name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        setErrorMessage("");
                    }}
                    placeholder="Credit card"
                    aria-describedby={
                        errorMessage
                            ? "liability-form-error"
                            : undefined
                    }
                    aria-invalid={
                        errorMessage ? "true" : "false"
                    }
                />
            </div>

            <div className="form-field">
                <label htmlFor="liability-category">
                    Category
                </label>

                <select
                    id="liability-category"
                    value={category}
                    onChange={(event) =>
                        setCategory(
                            event.target
                                .value as LiabilityCategory
                        )
                    }
                >
                    <option value="credit-card">
                        Credit Card
                    </option>

                    <option value="student-loan">
                        Student Loan
                    </option>

                    <option value="vehicle-loan">
                        Vehicle Loan
                    </option>

                    <option value="mortgage">
                        Mortgage
                    </option>

                    <option value="personal-loan">
                        Personal Loan
                    </option>

                    <option value="medical-debt">
                        Medical Debt
                    </option>

                    <option value="other">
                        Other
                    </option>
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="liability-value">
                    Balance
                </label>

                <input
                    id="liability-value"
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
                            ? "liability-form-error"
                            : undefined
                    }
                    aria-invalid={
                        errorMessage ? "true" : "false"
                    }
                />
            </div>

            {errorMessage && (
                <p
                    id="liability-form-error"
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
                {editingLiability
                    ? "Save Liability Changes"
                    : "Add Liability"}
            </button>

            {editingLiability && (
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

export default LiabilityForm;