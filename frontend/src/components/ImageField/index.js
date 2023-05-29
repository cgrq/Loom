import "./ImageField.css"

export default function ImageField({
    label, // Label text for input field
    value, // Controlled input value
    onChange, // Use with onChange for controlled input
}) {
    return (
        <div className="image-field-wrapper">
            <label className="image-field-label">{label}</label>
            <input
                className="image-field"
                type="file"
                accept="image/*"
                value={value}
                onChange={(e) => onChange(e.target.files[0])}
            />
        </div>
    )
}
