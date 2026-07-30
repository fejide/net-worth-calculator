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