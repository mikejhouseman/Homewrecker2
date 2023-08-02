// frontend/src/components/DeleteReview/DeleteReview.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteExistingReview } from '../../store/reviews';
import './DeleteReviewButton.css';

function DeleteReviewButton({ spotId, reviewId }) {
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDelete = async () => {
    // Dispatch the deleteExistingReview action to remove the review from the store
    await dispatch(deleteExistingReview(reviewId));
    setShowSuccessMessage(true);

    // Wait for a few seconds and then redirect to the spotId page
    setTimeout(() => {
      setShowSuccessMessage(false);
      window.location.href = `/spots/${spotId}`;
    }, 1000);
  };

  return (
    <div className='delete-review'>
      <button className='delete-button' onClick={handleDelete}>
        Delete Review
      </button>
      {showSuccessMessage && (
        <div className='success-message'>
          Review successfully deleted
        </div>
      )}
    </div>
  );
}

export default DeleteReviewButton;
