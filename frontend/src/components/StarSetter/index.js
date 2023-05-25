import "./StarSetter.css"

export default function StarSetter({
    value, // Rating value
    onChange, // Rating setter
}) {
    const handleStarClick = (number)=>{
        if(onChange){
            onChange(number)
        }
    }
    return (
        <div>
            <i
                className={`fas fa-star star-setter-star ${value >= 1 ? "star-setter-selected" : "star-setter-unselected"}`}
                onClick={() => handleStarClick(1)}
            />
            <i
                className={`fas fa-star star-setter-star ${value >= 2 ? "star-setter-selected" : "star-setter-unselected"}`}
                onClick={() => handleStarClick(2)}
            />
            <i
                className={`fas fa-star star-setter-star ${value >= 3 ? "star-setter-selected" : "star-setter-unselected"}`}
                onClick={() => handleStarClick(3)}
            />
            <i
                className={`fas fa-star star-setter-star ${value >= 4 ? "star-setter-selected" : "star-setter-unselected"}`}
                onClick={() => handleStarClick(4)}
            />
            <i
                className={`fas fa-star star-setter-star ${value >= 5 ? "star-setter-selected" : "star-setter-unselected"}`}
                onClick={() => handleStarClick(5)}
            />

        </div>
    )
}
