import React, { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spot";
import { useModal } from "../../context/Modal";
import "./SpotDetailsPage.css";
import AddReviewForm from "../AddReviewForm";
import GetAllReviews from "../GetAllReviews";
import EditSpotModal from "../EditSpotModal";
import DeleteSpotButton from "../DeleteSpotButton";
import DeleteReviewButton from "../DeleteReviewButton"; // Import the DeleteReviewButton component

const SpotDetailsPage = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const { showModal, setShowModal } = useModal();
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    dispatch(spotActions.getSpotDetails(spotId));
  }, [dispatch, spotId]);

  if (!spot) {
    return <div>Spot not found.</div>;
  }

  const handleEditSpot = () => {
    setShowModal(true);
  };

  return (
    <div className="spot-details-container">
      <div className="spot-details">
        <h1>{spot.name}</h1>
        <p>{spot.description}</p>
        <p>Price: {spot.price}</p>
        <p>Average Rating: {spot.avgStarRating}</p>
        <p>Number of Reviews: {spot.numReviews}</p>
        <div className="spot-images">
          {spot.SpotImages.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={`Spot ${spot.name} preview`}
            />
          ))}
        </div>
      </div>
      <div className="edit-delete-buttons">
        <button onClick={handleEditSpot}>Edit Spot</button>
        <DeleteSpotButton spotId={spotId} ownerId={spot.userId} userId={userId} />
      </div>
      <div className="add-review">
        <AddReviewForm spotId={spotId} />
      </div>
      <div className="all-reviews">
        <GetAllReviews spotId={spotId} />
      </div>
      {showModal && <EditSpotModal spot={spot} />}
      {/* Render DeleteReviewButton for each review */}
      {spot.Reviews.map((review) => (
        <div key={review.id} className="delete-review-button">
          <DeleteReviewButton reviewId={review.id} />
        </div>
      ))}
    </div>
  );
};

export default SpotDetailsPage;
