// frontend/src/components/AddReviewForm/index.js
import React, { useRef } from "react";
import * as reviewActions from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"; // Import useHistory
import "./AddReviewForm.css";

function AddReviewForm({ spotId }) { // Accept spotId as a prop
  const dispatch = useDispatch();
  const starsRef = useRef();
  const reviewTextRef = useRef();
  const history = useHistory(); // Initialize useHistory

  const onSubmit = async (e) => {
    e.preventDefault();
    const stars = starsRef.current.value;
    const reviewText = reviewTextRef.current.value;

    if (!stars || !reviewText) {
      // Handle form validation if needed (e.g., display an error message)
      return;
    }
    // Create the review object with the form data
    const newReview = {
      spotId, // Use the provided spotId
      stars: parseInt(stars),
      reviewText,
    };
    // Dispatch the addNewReview action with the new review data
    await dispatch(reviewActions.addNewReview(newReview));
    // Navigate to the spot page after adding the review
    history.push(`/spots/${spotId}`);
  };

  return (
    <>
      <h1>Add Review</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='stars'>Stars</label>
        <input ref={starsRef} name='stars' type='number' />
        <label htmlFor='reviewText'>Review Text</label>
        <input ref={reviewTextRef} name='reviewText' type='text' />
        <button type="submit">Submit Review</button>
      </form>
    </>
  );
}

export default AddReviewForm;
