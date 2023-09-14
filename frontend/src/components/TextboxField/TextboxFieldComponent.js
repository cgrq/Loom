'use client'
import "./TextboxFieldComponent.css"

export default function TextboxFieldComponent({
    label, // Label text for textbox field
    value, // Controlled textbox value
    onChange, // Use with onChange for controlled textbox
    isRequired = false, // Boolean indicating whether or not the field is required
}) {
    return (
        <div className="textbox-field-wrapper">
            <label className="textbox-field-label">{label}</label>
            <textarea
                className="textbox-field"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={isRequired}
            />
        </div>
    )
}
