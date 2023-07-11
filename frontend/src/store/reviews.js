const SET_REVIEW = "reviews/SET_REVIEW";
const SET_REVIEWS = "reviews/SET_REVIEWS";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
const RESET_REVIEWS = "reviews/RESET_REVIEWS";


const setReview = (review) => ({
  type: SET_REVIEW,
  payload: review,
});

const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews,
});

const removeReview = (review) => ({
  type: REMOVE_REVIEW,
  payload: review
});

export const resetReviews = () => ({
  type: RESET_REVIEWS
})

export const createReviewThunk =
  (rating, message, productId, userId) =>
    async (dispatch) => {

      const response = await fetch("/api/reviews/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          message,
          productId,
          userId
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setReview(data));
        return null;
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

export const editReviewThunk =
  (id, rating, message, productId, userId) =>
    async (dispatch) => {

      const response = await fetch(`/api/reviews/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          message,
          productId,
          userId
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setReview(data));
        return null;
      } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    };

export const deleteReview = (review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/product/${review.productId}/delete`, {
    method: 'DELETE'
  });


  if (response.ok) {
    dispatch(removeReview({review}));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

export const getAllReviewsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/reviews/`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(setReviews(reviews));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

export const getReviewsByProductId = (productId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/product/${productId}`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(setReviews(reviews));
    return null;
  } else {
    const errorResponse = await response.json();
    return errorResponse.errors;
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = {
    ...state
  }
  switch (action.type) {
    case SET_REVIEW:
      newState[action.payload.review.productId] = { ...newState[action.payload.review.productId] }
      newState[action.payload.review.productId][action.payload.review.userId] = action.payload.review

      return newState;

    case SET_REVIEWS:
      action.payload.reviews.forEach(review => {
        newState[review.productId] = { ...newState[review.productId] }
        newState[review.productId][review.userId] = review
      })

      return newState;

    case REMOVE_REVIEW:
      delete newState[action.payload.review.productId][action.payload.review.userId]

      return newState;

    case RESET_REVIEWS:
      newState = {}
      return newState;

    default:
      return state;
  }
}
