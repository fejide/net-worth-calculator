import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import type {
    Expense,
    ExpenseCategory,
} from "../types/budget";

interface ExpenseFormProps {
    onAddExpense: (expense: Expense) => void;
    onUpdateExpense: (expense: Expense) => void;
    editingExpense: Expense | null;
    onCancelEdit: () => void;
}

function ExpenseForm({
    onAddExpense,
    onUpdateExpense,
    editingExpense,
    onCancelEdit,
}: ExpenseFormProps) {
    const [name, setName] = useState("");
    const [category, setCategory] =
        useState<ExpenseCategory>("housing");
    const [amount, setAmount] = useState("");
    const [errorMessage, setErrorMessage] =
        useState("");

    useEffect(() => {
        setErrorMessage("");

        if (editingExpense) {
            setName(editingExpense.name);
            setCategory(editingExpense.category);
            setAmount(String(editingExpense.amount));
            return;
        }

        resetForm();
    }, [editingExpense]);

    function resetForm() {
        setName("");
        setCategory("housing");
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
                "Enter a name for this expense."
            );
            return;
        }

        if (!amount || Number.isNaN(numericAmount)) {
            setErrorMessage(
                "Enter a valid monthly expense amount."
            );
            return;
        }

        if (numericAmount <= 0) {
            setErrorMessage(
                "The monthly expense amount must be greater than zero."
            );
            return;
        }

        setErrorMessage("");

        if (editingExpense) {
            onUpdateExpense({
                ...editingExpense,
                name: trimmedName,
                category,
                amount: numericAmount,
            });

            resetForm();
            return;
        }

        const newExpense: Expense = {
            id: crypto.randomUUID(),
            name: trimmedName,
            category,
            amount: numericAmount,
        };

        onAddExpense(newExpense);
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
                <label htmlFor="expense-name">
                    Expense name
                </label>

                <input
                    id="expense-name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        setErrorMessage("");
                    }}
                    placeholder="Rent"
                    aria-describedby={
                        errorMessage
                            ? "expense-form-error"
                            : undefined
                    }
                    aria-invalid={
                        errorMessage ? "true" : "false"
                    }
                />
            </div>

            <div className="form-field">
                <label htmlFor="expense-category">
                    Category
                </label>

                <select
                    id="expense-category"
                    value={category}
                    onChange={(event) =>
                        setCategory(
                            event.target
                                .value as ExpenseCategory
                        )
                    }
                >
                    <option value="housing">
                        Housing
                    </option>

                    <option value="utilities">
                        Utilities
                    </option>

                    <option value="transportation">
                        Transportation
                    </option>

                    <option value="food">
                        Food
                    </option>

                    <option value="insurance">
                        Insurance
                    </option>

                    <option value="healthcare">
                        Healthcare
                    </option>

                    <option value="debt-payments">
                        Debt Payments
                    </option>

                    <option value="savings">
                        Savings
                    </option>

                    <option value="entertainment">
                        Entertainment
                    </option>

                    <option value="personal">
                        Personal
                    </option>

                    <option value="other">
                        Other
                    </option>
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="expense-amount">
                    Monthly amount
                </label>

                <input
                    id="expense-amount"
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
                            ? "expense-form-error"
                            : undefined
                    }
                    aria-invalid={
                        errorMessage ? "true" : "false"
                    }
                />
            </div>

            {errorMessage && (
                <p
                    id="expense-form-error"
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
                {editingExpense
                    ? "Save Expense Changes"
                    : "Add Expense"}
            </button>

            {editingExpense && (
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

export default ExpenseForm;