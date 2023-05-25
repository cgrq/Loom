import "./ReviewsFeed.css"

export default function ReviewsFeed({
    reviews, // Array of review objects
}){
    return (
        <div className="reviews-feed-wrapper">
            {
                Object.values(reviews).map((review)=>{
                    <div className="review-wrapper">
                        <div>{review.modified_at}</div>
                        <div>{review.user}</div>
                        <div>{review.rating}</div>
                        <div>{review.message}</div>
                    </div>
                })
            }
        </div>
    )
}
