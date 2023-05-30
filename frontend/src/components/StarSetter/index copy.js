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
                value === 0 || (value > 1 && value > (numberMinusOne + 0) && value < (numberMinusOne + .05))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/empty.png"}
                        className="star-setter-star"
                      />

            }
            {
                (value > 1 && value > (numberMinusOne + 0.05) && value < (numberMinusOne + .15))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/tenth1.png"}
                        className="star-setter-star"
                      />

            }
            {
                (value > 1 && value > (numberMinusOne + 0.15) && value < (numberMinusOne + .25))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/tenth2.png"}
                        className="star-setter-star"
                      />

            }
            {
                (value > 1 && value > (numberMinusOne + 0.25) && value < (numberMinusOne + .35))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/tenth3.png"}
                        className="star-setter-star"
                      />

            }
            {
                (value > 1 && value > (numberMinusOne + 0.35) && value < (numberMinusOne + .45))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/tenth4.png"}
                        className="star-setter-star"
                      />

            }
            {
                (value > 1 && value > (numberMinusOne + 0.45) && value < (numberMinusOne + .55))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/tenth5.png"}
                        className="star-setter-star"
                      />

            }
            {
                (value > 1 && value > (numberMinusOne + 0.55) && value < (numberMinusOne + .65))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/tenth6.png"}
                        className="star-setter-star"
                      />

            }
            {
                (value > 1 && value > (numberMinusOne + 0.65) && value < (numberMinusOne + .75))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/tenth7.png"}
                        className="star-setter-star"
                      />

            }
            {
                (value > 1 && value > (numberMinusOne + 0.75) && value < (numberMinusOne + .85))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/tenth8.png"}
                        className="star-setter-star"
                      />

            }
            {
                (value > 1 && value > (numberMinusOne + 0.85) && value < (numberMinusOne + .95))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/tenth9.png"}
                        className="star-setter-star"
                      />

            }
            {
                (value > 1 && value > (numberMinusOne + 0.95) && value < (numberMinusOne + 1))
                    && <img
                        src={process.env.PUBLIC_URL + "/stars/full.png"}
                        className="star-setter-star"
                      />

            }


        </>
    )
}
