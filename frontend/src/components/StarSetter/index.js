import "./StarSetter.css"

export default function StarSetter({
    value, // Rating value
    onChange, // Rating setter
    clickable = false,
}) {

    const handleStarClick = (number) => {
        if (onChange) {
            onChange(number)
        }
    }

    return (
        <div className={`${clickable ? "star-setter-clickable" : ""}`}>
            <Star
                value={value}
                onChange={handleStarClick}
                number={1}
            />
            <Star
                value={value}
                onChange={handleStarClick}
                number={2}
            />
            <Star
                value={value}
                onChange={handleStarClick}
                number={3}
            />
            <Star
                value={value}
                onChange={handleStarClick}
                number={4}
            />
            <Star
                value={value}
                onChange={handleStarClick}
                number={5}
            />
        </div>
    )
}

function Star({
    value,
    onChange,
    number
}){
    const numberMinusOne = number - 1;

    return (
        <>
             {
                (value > 1 && value > (numberMinusOne + .25) && value < (numberMinusOne + .75))
                    // Half Star
                    ? <i
                        className={`fas fa-star-half star-setter-star star-setter-selected`}
                      />
                    // Full Star
                    : <i
                        className={`fas fa-star star-setter-star ${(value >= number) ? "star-setter-selected" : "star-setter-unselected"}`}
                        onClick={()=>onChange(number)}
                      />
            }
        </>
    )
}
