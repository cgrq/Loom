import { useEffect, useState } from "react";
import TextboxField from "../TextboxField"
import CTAButton from "../CTAButton"
import DeleteButton from "../DeleteButton"
import "./ProductPageReviews.css"
import StarSetter from "../StarSetter";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk, deleteReview, editReviewThunk, getReviewsByProductId } from "../../store/reviews";


export default function ProductPageReviews({
    productId
}) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.session);
    const allReviews = useSelector((state) => state.reviews);
    const [reviewId, setReviewId] = useState();
    const [userReview, setUserReview] = useState("");
    const [rating, setRating] = useState(0);
    const [editingReview, setEditingReview] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageLoadError, setImageLoadError] = useState(false);


    useEffect(() => {
        dispatch(getReviewsByProductId(productId))
    }, [])

    useEffect(() => {
        if (
            allReviews[productId]
            && Object.values(allReviews[productId]).length > 0
            && user
            && allReviews[productId][user.id]
            && Object.values(allReviews[productId][user.id].length > 0)
        ) {
            setEditingReview(true)
        } else {
            setEditingReview(false)
        }
    }, [allReviews])

    useEffect(() => {
        if (editingReview) {
            setUserReview(allReviews[productId][user.id].message)
            setRating(allReviews[productId][user.id].rating)
            setReviewId(allReviews[productId][user.id].id)
        } else {
            setUserReview("")
        }
    }, [editingReview])

    const handleSubmit = async () => {
        if (rating > 0) {
            setErrors({})
            const data = await dispatch(createReviewThunk(
                rating,
                userReview,
                productId,
                user.id
            ))
            if (data) {
                setErrors(data);
            }

        }
    }

    const handleEdit = async () => {
        setErrors({})
        const data = await dispatch(editReviewThunk(
            reviewId,
            rating,
            userReview,
            productId,
            user.id
        ))
        if (data) {
            setErrors(data);
        }


    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();

        const options = {
            month: "numeric",
            day: "numeric",
            year: "2-digit",
        };

        const formattedDate = date.toLocaleDateString("en-US", options);
        const todayFormattedDate = today.toLocaleDateString("en-US", options);

        if (formattedDate === todayFormattedDate) {
            return "today";
        } else if (date.getDate() === today.getDate() - 1) {
            return "yesterday";
        } else {
            return formattedDate.replace(/^0+/, '');
        }
    }


    return (
        <div className="product-page-reviews-wrapper">
            <div className="product-page-reviews-title-wrapper">
                <h1>Reviews</h1>
            </div>
            <div className="user-review-wrapper">
                <TextboxField
                    label="Leave a review"
                    value={userReview}
                    onChange={setUserReview}
                />
            </div>
            {errors.message && <p className="input-error">{errors.message}</p>}

            <div className="product-page-star-setter-wrapper">
                <StarSetter
                    value={rating}
                    onChange={setRating}
                    clickable={true}
                />
            </div>
            <div className="product-page-star-setter-button-wrapper">
                <div>
                    <CTAButton
                        buttonText={editingReview ? "Submit Edit" : "Submit"}
                        onClick={editingReview ? handleEdit : handleSubmit}
                    />
                </div>
                {
                    editingReview && (
                        <div className="product-page-star-setter-delete-button">
                            <DeleteButton
                                onDeleteThunk={deleteReview(allReviews[productId][user.id])}
                                setErrors={setErrors}
                            />
                        </div>
                    )
                }
            </div>
            <div className="product-page-reviews-feed">
                {
                    allReviews[productId]
                        ?
                        (Object.values(allReviews[productId]).map((review) => (
                            review.productId === productId && (
                                <div key={review.id} className="product-page-review-wrapper">
                                    <div className="product-page-review-details-wrapper">
                                        <img
                                            className="product-page-review-details-image"
                                            src={imageLoadError ? (process.env.PUBLIC_URL + "/default-profile-pic.png") : review.userProfileImage}
                                            onError={() => setImageLoadError(true)}
                                        />
                                        <span>{review.username}</span>
                                        <StarSetter value={review.rating} />
                                    </div>
                                    <div className="product-page-review-message-wrapper">
                                        {review.message}
                                    </div>
                                    <div className="product-page-review-date-wrapper">
                                        {formatDate(review.updated_at)}
                                    </div>
                                </div>
                            )
                        )))
                        : <></>
                }
            </div>
        </div>
    )
}
