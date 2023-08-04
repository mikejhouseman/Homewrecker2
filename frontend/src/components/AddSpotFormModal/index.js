import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import * as spotActions from '../../store/spot';

// Set the modal root element in the DOM
Modal.setAppElement('#root');

const AddSpotFormModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  const [spotData, setSpotData] = useState({
    name: '',
    city: '',
    state: '',
    country: '',
    description: '',
    price: '',
    largeImage: '',
    smallImages: ['', '', '', ''],
    hostFirstName: '',
    hostLastName: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSpotData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSmallImageChange = (index, event) => {
    const smallImagesCopy = [...spotData.smallImages];
    smallImagesCopy[index] = event.target.value;
    setSpotData((prevData) => ({ ...prevData, smallImages: smallImagesCopy }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform any validation or additional actions before dispatching
    dispatch(spotActions.addNewSpot(spotData));
    // Close the modal after submitting the form
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Spot Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="create-new-spot-container">
        <h1>Create a New Spot</h1>
        <form onSubmit={handleSubmit}>
          {/* Form fields and input elements go here */}
          <button type="submit">Create Spot</button>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddSpotFormModal;
