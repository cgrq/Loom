import "./StarSetter.css"

export default function StarSetter({
    value, // Rating value
    onChange, // Rating setter
}) {
    return (
        <div>
            <i
                className={`fas fa-star star-setter-star ${value >= 1 ? "star-setter-selected" : "star-setter-unselected"}`}
                onClick={() => onChange(1)}
            />
            <i
                className={`fas fa-star star-setter-star ${value >= 2 ? "star-setter-selected" : "star-setter-unselected"}`}
                onClick={() => onChange(2)}
            />
            <i
                className={`fas fa-star star-setter-star ${value >= 3 ? "star-setter-selected" : "star-setter-unselected"}`}
                onClick={() => onChange(3)}
            />
            <i
                className={`fas fa-star star-setter-star ${value >= 4 ? "star-setter-selected" : "star-setter-unselected"}`}
                onClick={() => onChange(4)}
            />
            <i
                className={`fas fa-star star-setter-star ${value >= 5 ? "star-setter-selected" : "star-setter-unselected"}`}
                onClick={() => onChange(5)}
            />

        </div>
    )
}
