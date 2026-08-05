import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import type {
    Income,
    IncomeCategory,
} from "../types/budget";

interface IncomeFormProps {
    onAddIncome: (income: Income) => void;
    onUpdateIncome: (income: Income) => void;
    editingIncome: Income | null;
    onCancelEdit: () => void;
}

function IncomeForm({
    onAddIncome,
    onUpdateIncome,
    editingIncome,
    onCancelEdit,
}: IncomeFormProps) {
    const [name, setName] = useState("");
    const [category, setCategory] =
        useState<IncomeCategory>("salary");
    const [amount, setAmount] = useState("");
    const [errorMessage, setErrorMessage] =
        useState("");

    useEffect(() => {
        setErrorMessage("");

        if (editingIncome) {
            setName(editingIncome.name);
            setCategory(editingIncome.category);
            setAmount(String(editingIncome.amount));
            return;
        }

        resetForm();
    }, [editingIncome]);

    function resetForm() {
        setName("");
        setCategory("salary");
        setAmount("");
        setErrorMessage("");
    }

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const trimmedName = name.trim();
        const numericAmount = Number(amount);

        if (!trimmedName) {
            setErrorMessage(
                "Enter a name for this income source."
            );
            return;
        }

        if (!amount || Number.isNaN(numericAmount)) {
            setErrorMessage(
                "Enter a valid monthly income amount."
            );
            return;
        }

        if (numericAmount <= 0) {
            setErrorMessage(
                "The monthly income amount must be greater than zero."
            );
            return;
        }

        setErrorMessage("");

        if (editingIncome) {
            onUpdateIncome({
                ...editingIncome,
                name: trimmedName,
                category,
                amount: numericAmount,
            });

            resetForm();
            return;
        }

        const newIncome: Income = {
            id: crypto.randomUUID(),
            name: trimmedName,
            category,
            amount: numericAmount,
        };

        onAddIncome(newIncome);
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
                <label htmlFor="income-name">
                    Income source
                </label>

                <input
                    id="income-name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        setErrorMessage("");
                    }}
                    placeholder="Primary job"
                    aria-describedby={
                        errorMessage
                            ? "income-form-error"
                            : undefined
                    }
                    aria-invalid={
                        errorMessage ? "true" : "false"
                    }
                />
            </div>

            <div className="form-field">
                <label htmlFor="income-category">
                    Category
                </label>

                <select
                    id="income-category"
                    value={category}
                    onChange={(event) =>
                        setCategory(
                            event.target
                                .value as IncomeCategory
                        )
                    }
                >
                    <option value="salary">
                        Salary
                    </option>

                    <option value="freelance">
                        Freelance
                    </option>

                    <option value="business">
                        Business
                    </option>

                    <option value="investments">
                        Investments
                    </option>

                    <option value="benefits">
                        Benefits
                    </option>

                    <option value="other">
                        Other
                    </option>
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="income-amount">
                    Monthly amount
                </label>

                <input
                    id="income-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(event) => {
                        setAmount(event.target.value);
                        setErrorMessage("");
                    }}
                    placeholder="0.00"
                    aria-describedby={
                        errorMessage
                            ? "income-form-error"
                            : undefined
                    }
                    aria-invalid={
                        errorMessage ? "true" : "false"
                    }
                />
            </div>

            {errorMessage && (
                <p
                    id="income-form-error"
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
                {editingIncome
                    ? "Save Income Changes"
                    : "Add Income"}
            </button>

            {editingIncome && (
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

export default IncomeForm;