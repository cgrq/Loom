'use client'
import "./StarSetterComponent.css";
import Image from 'next/image';

export default function StarSetterComponent({
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
            <Image
                alt="empty star"
                src={process.env.PUBLIC_URL + "/stars/empty.png"}
                className="star-setter-star"
            />
            <Image
                alt="tenth1 star"
                src={process.env.PUBLIC_URL + "/stars/tenth1.png"}
                className="star-setter-star"
            />
            <Image
                alt="tenth2 star"
                src={process.env.PUBLIC_URL + "/stars/tenth2.png"}
                className="star-setter-star"
            />
            <Image
                alt="tenth3 star"
                src={process.env.PUBLIC_URL + "/stars/tenth3.png"}
                className="star-setter-star"
            />
            <Image
                alt="tenth4 star"
                src={process.env.PUBLIC_URL + "/stars/tenth4.png"}
                className="star-setter-star"
            />
            <Image
                alt="tenth5 star"
                src={process.env.PUBLIC_URL + "/stars/tenth5.png"}
                className="star-setter-star"
            />
            <Image
                alt="tenth6 star"
                src={process.env.PUBLIC_URL + "/stars/tenth6.png"}
                className="star-setter-star"
            />
            <Image
                alt="tenth7 star"
                src={process.env.PUBLIC_URL + "/stars/tenth7.png"}
                className="star-setter-star"
            />
            <Image
                alt="tenth8 star"
                src={process.env.PUBLIC_URL + "/stars/tenth8.png"}
                className="star-setter-star"
            />
            <Image
                alt="tenth9 star"
                src={process.env.PUBLIC_URL + "/stars/tenth9.png"}
                className="star-setter-star"
            />
            <Image
                alt="full star"
                src={process.env.PUBLIC_URL + "/stars/full.png"}
                className="star-setter-star"
            />
        </div>
    )
}