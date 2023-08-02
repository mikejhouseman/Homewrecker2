// frontend/src/components/GetAllReviews/GetAllReviews.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './GetAllReviews.css';

function GetAllReviews({ spotId }) {
  const reviews = useSelector((state) => state.reviews.list);

  const spotReviews = reviews.filter((review) => review.spotId === spotId);

  return (
    <div className='review-list'>
      <h2>Reviews</h2>
      {spotReviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {spotReviews.map((review) => (
            <li key={review.id} className='review-item'>
              <div className='review-stars'>Stars: {review.stars}</div>
              <div className='review-text'>{review.reviewText}</div>
              <Link to={`/spots/${spotId}/editReview/${review.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetAllReviews;
