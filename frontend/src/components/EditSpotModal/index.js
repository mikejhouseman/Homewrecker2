// frontend/src/components/EditSpotModal/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editExistingSpot } from "../../store/spot";
import { useModal } from "../../context/Modal";
import "./EditSpotModal.css";

const EditSpotModal = ({ spot }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSpot = {
      ...spot,
      name,
      description,
      price,
    };
    dispatch(editExistingSpot(updatedSpot));
    closeModal();
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h1>Edit Spot</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Price
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <div className="button-container">
            <button type="submit">Update Spot</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSpotModal;
