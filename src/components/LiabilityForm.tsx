import { useState, type FormEvent } from "react";
import type {
    Liability,
    LiabilityCategory,
} from "../types/finance";

interface LiabilityFormProps {
    onAddLiability: (liability: Liability) => void;
}

function LiabilityForm({
    onAddLiability,
}: LiabilityFormProps) {
    const [name, setName] = useState("");
    const [category, setCategory] =
        useState<LiabilityCategory>("credit-card");
    const [value, setValue] = useState("");

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const numericValue = Number(value);

        if (!name.trim() || numericValue <= 0) {
            return;
        }

        const newLiability: Liability = {
            id: crypto.randomUUID(),
            name: name.trim(),
            category,
            value: numericValue,
        };

        onAddLiability(newLiability);

        setName("");
        setCategory("credit-card");
        setValue("");
    }

    return (
        <form
            className="finance-form"
            onSubmit={handleSubmit}
        >
            <div className="form-field">
                <label htmlFor="liability-name">
                    Liability name
                </label>

                <input
                    id="liability-name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    placeholder="Credit card"
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
                Add Liability
            </button>
        </form>
    );
}

export default LiabilityForm;