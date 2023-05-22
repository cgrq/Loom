import "./InputField.css"

export default function InputField({
    label, // Label text for input field
    value, // Controlled input value
    onChange, // Use with onChange for controlled input
    isRequired = false, // Boolean indicating whether or not the field is required
}) {
    return (
        <div className="input-field-wrapper">
            <label className="input-field-label">{label}</label>
            <input
                className="input-field"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={isRequired}
            />
        </div>
    )
}
