import React from 'react';
import './StarSetter.css';

export default function StarSetter({
  value, // Rating value
  onChange, // Rating setter
  clickable = false,
}) {
  const handleStarClick = (number) => {
    if (onChange) {
      onChange(number);
    }
  };

  return (
    <div className={`${clickable ? 'star-setter-clickable' : ''}`}>
      {[1, 2, 3, 4, 5].map((number) => (
        <Star
          key={number}
          value={value}
          onChange={handleStarClick}
          number={number}
        />
      ))}
    </div>
  );
}

function Star({ value, onChange, number }) {
  const filledStars = Math.floor(value);
  const decimalPart = value - filledStars;
  const numberMinusOne = number - 1;

  return (
    <img
      src={
        value >= number
          ? process.env.PUBLIC_URL + '/stars/full.png'
          : decimalPart > 0 &&
            value > numberMinusOne &&
            value < number
          ? process.env.PUBLIC_URL + `/stars/tenth${Math.ceil(decimalPart * 10)}.png`
          : process.env.PUBLIC_URL + '/stars/empty.png'
      }
      className="star-setter-star"
      onClick={() => onChange(number)}
      alt={value >= number ? 'filled star' : 'empty star'}
    />
  );
}
