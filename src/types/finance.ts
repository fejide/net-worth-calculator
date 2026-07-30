export type AssetCategory =
    | "cash"
    | "investments"
    | "property"
    | "vehicle"
    | "retirement"
    | "other";

export interface Asset {
    id: string;
    name: string;
    category: AssetCategory;
    value: number;
}

export type LiabilityCategory =
    | "credit-card"
    | "student-loan"
    | "vehicle-loan"
    | "mortgage"
    | "personal-loan"
    | "medical-debt"
    | "other";

export interface Liability {
    id: string;
    name: string;
    category: LiabilityCategory;
    value: number;
}