import { useEffect, useState } from "react";
import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";
import type {
    Income,
    Expense,
} from "../types/budget";

const INCOME_STORAGE_KEY =
    "financial-clarity-income";

const EXPENSES_STORAGE_KEY =
    "financial-clarity-expenses";

function loadIncome(): Income[] {
    try {
        const savedIncome = localStorage.getItem(
            INCOME_STORAGE_KEY
        );

        if (!savedIncome) {
            return [];
        }

        return JSON.parse(savedIncome) as Income[];
    } catch {
        return [];
    }
}

function loadExpenses(): Expense[] {
    try {
        const savedExpenses = localStorage.getItem(
            EXPENSES_STORAGE_KEY
        );

        if (!savedExpenses) {
            return [];
        }

        return JSON.parse(savedExpenses) as Expense[];
    } catch {
        return [];
    }
}

function BudgetPage() {
    const [income, setIncome] =
        useState<Income[]>(loadIncome);

    const [expenses, setExpenses] =
        useState<Expense[]>(loadExpenses);

    const [editingIncome, setEditingIncome] =
        useState<Income | null>(null);

    const [editingExpense, setEditingExpense] =
        useState<Expense | null>(null);

    useEffect(() => {
        localStorage.setItem(
            INCOME_STORAGE_KEY,
            JSON.stringify(income)
        );
    }, [income]);

    useEffect(() => {
        localStorage.setItem(
            EXPENSES_STORAGE_KEY,
            JSON.stringify(expenses)
        );
    }, [expenses]);

    function handleAddIncome(
        newIncome: Income
    ) {
        setIncome((currentIncome) => [
            ...currentIncome,
            newIncome,
        ]);
    }

    function handleUpdateIncome(
        updatedIncome: Income
    ) {
        setIncome((currentIncome) =>
            currentIncome.map((incomeEntry) =>
                incomeEntry.id ===
                updatedIncome.id
                    ? updatedIncome
                    : incomeEntry
            )
        );

        setEditingIncome(null);
    }

    function handleStartIncomeEdit(
        incomeEntry: Income
    ) {
        setEditingIncome(incomeEntry);
    }

    function handleCancelIncomeEdit() {
        setEditingIncome(null);
    }

    function handleDeleteIncome(
        incomeId: string
    ) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this income source?"
        );

        if (!confirmed) {
            return;
        }

        setIncome((currentIncome) =>
            currentIncome.filter(
                (incomeEntry) =>
                    incomeEntry.id !== incomeId
            )
        );

        if (editingIncome?.id === incomeId) {
            setEditingIncome(null);
        }
    }

    function handleAddExpense(
        expense: Expense
    ) {
        setExpenses((currentExpenses) => [
            ...currentExpenses,
            expense,
        ]);
    }

    function handleUpdateExpense(
        updatedExpense: Expense
    ) {
        setExpenses((currentExpenses) =>
            currentExpenses.map((expense) =>
                expense.id ===
                updatedExpense.id
                    ? updatedExpense
                    : expense
            )
        );

        setEditingExpense(null);
    }

    function handleStartExpenseEdit(
        expense: Expense
    ) {
        setEditingExpense(expense);
    }

    function handleCancelExpenseEdit() {
        setEditingExpense(null);
    }

    function handleDeleteExpense(
        expenseId: string
    ) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmed) {
            return;
        }

        setExpenses((currentExpenses) =>
            currentExpenses.filter(
                (expense) =>
                    expense.id !== expenseId
            )
        );

        if (editingExpense?.id === expenseId) {
            setEditingExpense(null);
        }
    }

    const totalIncome = income.reduce(
        (total, incomeEntry) =>
            total + incomeEntry.amount,
        0
    );

    const totalExpenses = expenses.reduce(
        (total, expense) =>
            total + expense.amount,
        0
    );

    const remainingBalance =
        totalIncome - totalExpenses;

    const savingsRate =
        totalIncome > 0
            ? (remainingBalance /
                  totalIncome) *
              100
            : 0;

    function formatCurrency(
        amount: number
    ) {
        return new Intl.NumberFormat(
            "en-US",
            {
                style: "currency",
                currency: "USD",
            }
        ).format(amount);
    }

    function formatPercentage(
        amount: number
    ) {
        return `${amount.toFixed(1)}%`;
    }

    return (
        <section className="calculator-page">
            <div className="calculator-container">
                <header className="calculator-header">
                    <p className="eyebrow">
                        Monthly Budget Calculator
                    </p>

                    <h1>
                        Give every dollar a clear purpose.
                    </h1>

                    <p className="calculator-description">
                        Record your monthly income and
                        expenses to understand your cash
                        flow, spending, and remaining
                        balance.
                    </p>
                </header>

                <section
                    className="financial-summary-grid"
                    aria-label="Budget summary"
                >
                    <article className="financial-summary-card">
                        <p className="financial-summary-label">
                            Monthly Income
                        </p>

                        <p className="financial-summary-amount">
                            {formatCurrency(
                                totalIncome
                            )}
                        </p>

                        <p className="financial-summary-detail">
                            {income.length}{" "}
                            {income.length === 1
                                ? "income source"
                                : "income sources"}
                        </p>
                    </article>

                    <article className="financial-summary-card">
                        <p className="financial-summary-label">
                            Monthly Expenses
                        </p>

                        <p className="financial-summary-amount">
                            {formatCurrency(
                                totalExpenses
                            )}
                        </p>

                        <p className="financial-summary-detail">
                            {expenses.length}{" "}
                            {expenses.length === 1
                                ? "expense"
                                : "expenses"}
                        </p>
                    </article>

                    <article
                        className={`financial-summary-card net-worth-summary-card ${
                            remainingBalance < 0
                                ? "negative-net-worth"
                                : "positive-net-worth"
                        }`}
                    >
                        <p className="financial-summary-label">
                            Remaining Balance
                        </p>

                        <p className="financial-summary-amount">
                            {formatCurrency(
                                remainingBalance
                            )}
                        </p>

                        <p className="financial-summary-detail">
                            Income minus expenses
                        </p>
                    </article>

                    <article className="financial-summary-card">
                        <p className="financial-summary-label">
                            Savings Rate
                        </p>

                        <p className="financial-summary-amount">
                            {formatPercentage(
                                savingsRate
                            )}
                        </p>

                        <p className="financial-summary-detail">
                            Remaining balance divided
                            by income
                        </p>
                    </article>
                </section>

                <div className="calculator-grid">
                    <section className="calculator-card">
                        <h2>Income</h2>

                        <p>
                            Add your monthly salary,
                            freelance earnings,
                            business income, benefits,
                            investments, and other
                            income sources.
                        </p>

                        <IncomeForm
                            onAddIncome={
                                handleAddIncome
                            }
                            onUpdateIncome={
                                handleUpdateIncome
                            }
                            editingIncome={
                                editingIncome
                            }
                            onCancelEdit={
                                handleCancelIncomeEdit
                            }
                        />

                        <div className="finance-entry-list">
                            {income.length === 0 ? (
                                <p className="empty-state">
                                    No income sources
                                    have been added yet.
                                </p>
                            ) : (
                                income.map(
                                    (incomeEntry) => (
                                        <div
                                            className="finance-entry"
                                            key={
                                                incomeEntry.id
                                            }
                                        >
                                            <div>
                                                <h3>
                                                    {
                                                        incomeEntry.name
                                                    }
                                                </h3>

                                                <p>
                                                    {
                                                        incomeEntry.category
                                                    }
                                                </p>
                                            </div>

                                            <div className="entry-actions">
                                                <strong>
                                                    {formatCurrency(
                                                        incomeEntry.amount
                                                    )}
                                                </strong>

                                                <button
                                                    className="edit-entry-button"
                                                    type="button"
                                                    onClick={() =>
                                                        handleStartIncomeEdit(
                                                            incomeEntry
                                                        )
                                                    }
                                                    aria-label={`Edit ${incomeEntry.name}`}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-entry-button"
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteIncome(
                                                            incomeEntry.id
                                                        )
                                                    }
                                                    aria-label={`Delete ${incomeEntry.name}`}
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
                                Total Monthly Income
                            </span>

                            <strong>
                                {formatCurrency(
                                    totalIncome
                                )}
                            </strong>
                        </div>
                    </section>

                    <section className="calculator-card">
                        <h2>Expenses</h2>

                        <p>
                            Record your monthly
                            housing, utilities,
                            transportation, food,
                            insurance, savings, debt
                            payments, and personal
                            expenses.
                        </p>

                        <ExpenseForm
                            onAddExpense={
                                handleAddExpense
                            }
                            onUpdateExpense={
                                handleUpdateExpense
                            }
                            editingExpense={
                                editingExpense
                            }
                            onCancelEdit={
                                handleCancelExpenseEdit
                            }
                        />

                        <div className="finance-entry-list">
                            {expenses.length === 0 ? (
                                <p className="empty-state">
                                    No expenses have
                                    been added yet.
                                </p>
                            ) : (
                                expenses.map(
                                    (expense) => (
                                        <div
                                            className="finance-entry"
                                            key={
                                                expense.id
                                            }
                                        >
                                            <div>
                                                <h3>
                                                    {
                                                        expense.name
                                                    }
                                                </h3>

                                                <p>
                                                    {
                                                        expense.category
                                                    }
                                                </p>
                                            </div>

                                            <div className="entry-actions">
                                                <strong>
                                                    {formatCurrency(
                                                        expense.amount
                                                    )}
                                                </strong>

                                                <button
                                                    className="edit-entry-button"
                                                    type="button"
                                                    onClick={() =>
                                                        handleStartExpenseEdit(
                                                            expense
                                                        )
                                                    }
                                                    aria-label={`Edit ${expense.name}`}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-entry-button"
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteExpense(
                                                            expense.id
                                                        )
                                                    }
                                                    aria-label={`Delete ${expense.name}`}
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
                                Total Monthly Expenses
                            </span>

                            <strong>
                                {formatCurrency(
                                    totalExpenses
                                )}
                            </strong>
                        </div>
                    </section>

                    <section className="calculator-card summary-card">
                        <p className="summary-label">
                            Remaining Monthly Balance
                        </p>

                        <p className="summary-value">
                            {formatCurrency(
                                remainingBalance
                            )}
                        </p>

                        <p className="summary-formula">
                            {formatCurrency(
                                totalIncome
                            )}{" "}
                            in income minus{" "}
                            {formatCurrency(
                                totalExpenses
                            )}{" "}
                            in expenses
                        </p>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default BudgetPage;