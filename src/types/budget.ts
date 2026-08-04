export type IncomeCategory =
    | "salary"
    | "freelance"
    | "business"
    | "investments"
    | "benefits"
    | "other";

export interface Income {
    id: string;
    name: string;
    category: IncomeCategory;
    amount: number;
}

export type ExpenseCategory =
    | "housing"
    | "utilities"
    | "transportation"
    | "food"
    | "insurance"
    | "healthcare"
    | "debt-payments"
    | "savings"
    | "entertainment"
    | "personal"
    | "other";

export interface Expense {
    id: string;
    name: string;
    category: ExpenseCategory;
    amount: number;
}