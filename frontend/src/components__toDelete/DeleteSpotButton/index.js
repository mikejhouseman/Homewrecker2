// frontend/src/components/DeleteSpotButton/index.js
import React from "react";
import { useDispatch } from "react-redux";
import { deleteExistingSpot } from "../../store/spot";
import "./DeleteSpotButton.css";

const DeleteSpotButton = ({ spotId, ownerId, userId }) => {
  const dispatch = useDispatch();

  const handleDeleteSpot = async () => {
    if (userId === ownerId) {
      // Only dispatch the delete action if the user owns the spot
      try {
        await dispatch(deleteExistingSpot(spotId));
        window.alert("Spot deleted successfully.");
        window.location.href = "/";
      } catch (error) {
        console.error("Error deleting spot:", error);
      }
    }
  };

  if (userId !== ownerId) {
    // The button is only visible to the spot owner
    return null;
  }

  return (
    <button className="delete-spot-button" onClick={handleDeleteSpot}>
      Delete Spot
    </button>
  );
};

export default DeleteSpotButton;
