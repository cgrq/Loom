import "./InputField.css"

export default function InputField({
    label, // Label text for input field
    value, // Controlled input value
    onChange, // Use with onChange for controlled input
    isPassword = false, // Toggles type to password
    isRequired = false, // Boolean indicating whether or not the field is required
}) {
    return (
        <div className="input-field-wrapper">
            <label className="input-field-label">{label}</label>
            <input
                className="input-field"
                type={isPassword ? "password" : "text"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={isRequired}
            />
        </div>
    )
}
