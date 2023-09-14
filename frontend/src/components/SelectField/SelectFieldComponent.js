'use client'
import "./SelectFieldComponent.css"

export default function SelectFieldComponent({
    label, // Label text for input field
    value, // Controlled input value
    options, // Array of options for select field
    onChange, // Use with onChange for controlled input
    isRequired = false, // Boolean indicating whether or not the field is required
}) {
    return (
        <div className="select-field-wrapper">
            <label className="select-field-label">{label}</label>
            <select
                className="select-field"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={isRequired}
            >
                <option value="" disabled>Select category</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option.slice(0, 1).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}
