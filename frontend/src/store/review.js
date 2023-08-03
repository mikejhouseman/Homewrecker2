// // frontend/src/store/review.js
// frontend/src/store/review.js
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
});

export const getReviews = () => async (dispatch) => {
  try {
    const res = await fetch('/api/reviews');
    if (!res.ok) {
      throw new Error('Failed to get reviews from the server.');
    }
    const reviews = await res.json();
    await dispatch(loadReviews(reviews));
  } catch (error) {
    console.error('Error getting reviews:', error);
  }
};

export const addNewReview = (review) => async (dispatch) => {
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    if (!res.ok) {
      throw new Error('Failed to add review to the server.');
    }
    const newReview = await res.json();
    await dispatch(addReview(newReview));
  } catch (error) {
    console.error('Error adding review:', error);
  }
};

export const deleteExistingReview = (reviewId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete review from the server.');
    }
    const deletedReview = await res.json();
    await dispatch(deleteReview(deletedReview));
  } catch (error) {
    console.error('Error deleting review:', error);
  }
};

const initialState = {
  list: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const allReviews = {};
      action.reviews.forEach((review) => {
        allReviews[review.id] = review;
      });
      return {
        ...allReviews,
        ...state,
        list: action.reviews,
      };
    }
    case ADD_REVIEW: {
      const newState = {
        ...state,
        [action.review.id]: action.review,
      };
      newState.list = newState.list.map((reviewId) => newState[reviewId]);
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.review.id];
      newState.list = newState.list.filter((reviewId) => reviewId !== action.review.id);
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
