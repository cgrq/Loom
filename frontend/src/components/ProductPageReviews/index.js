import { useEffect, useState } from "react";
import TextboxField from "../TextboxField"
import CTAButton from "../CTAButton"
import DeleteButton from "../DeleteButton"
import "./ProductPageReviews.css"
import StarSetter from "../StarSetter";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk, editReviewThunk, getReviewsByProductId } from "../../store/reviews";


export default function ProductPageReviews({
    productId
}) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.session)
    const { reviews } = useSelector(state => state)
    const [reviewId, setReviewId] = useState()
    const [userReview, setUserReview] = useState("");
    const [rating, setRating] = useState(0);
    const [editingReview, setEditingReview] = useState(false)

    useEffect(() => {
        dispatch(getReviewsByProductId(productId))
    }, [])

    useEffect(() => {
        if (
            reviews[productId]
            && Object.values(reviews[productId]).length > 0
            && user
            && reviews[productId].userId === user.id
        ) {
            setEditingReview(true)
        } else {
            setEditingReview(false)
        }
    }, [reviews])

    useEffect(() => {
        if (editingReview) {
            setUserReview(reviews[productId].message)
            setRating(reviews[productId].rating)
            setReviewId(reviews[productId].id)
        } else {
            setUserReview("")
        }
    }, [editingReview])

    const handleSubmit = () => {
        if (rating > 0) {
            dispatch(createReviewThunk(
                rating,
                userReview,
                productId,
                user.id
            ))
        }
    }

    const handleEdit = () => {
        console.log(`🖥 ~ file: index.js:69 ~ handleEdit ~ rating:`, typeof rating)

        dispatch(editReviewThunk(
            reviewId,
            rating,
            userReview,
            productId,
            user.id
        ))
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
            <div className="product-page-star-setter-wrapper">
                <StarSetter
                    value={rating}
                    onChange={setRating}
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

                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
