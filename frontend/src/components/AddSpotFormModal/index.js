import React, { useState } from 'react';
import * as spotActions from '../../store/spot';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import './AddSpotFormModal.css';

//
//    TO DO:
//
//   EDITS TO BACKEND:
// - Add country to spots table
// - Figure out how images work
//
//  SPECIFICATIONS:
// - Show Spot Details for the new spot on successful create
// - This form resets when exiting (on Create, header link / button click, etc.)
//    so it always starts with no errors, and empty form inputs.
// - Upon successful create, create a spot details page for the new spot and direct users to it
//
// - VALIDATION NOTES:
//  Required fields:
//    When "Create" is clicked, show message under every empty feld that indicates
//    that feld is required (e. g. "Address is required" and so on for all felds)
//    Note: Out of all the image URL inputs, only the preview image URL is required.
//  Description Minimum Length:
//    When "Create" is clicked, show message "Description
//    needs 30 or more characters" under the description
//    input if user entered less than 30 characters.
//   Image URLs
//    When "Create" is clicked, show message "Image URL
//    needs to end in png or jpg (or jpeg)" under any image
//    URL inputs which don't have the proper fle type



function AddSpotFormModal() {
  const dispatch = useDispatch();
  const [ address, setAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ state, setState ] = useState('');
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ errors, setErrors ] = useState({});
  // const [ previewImage, setPreviewImage ] = useState('');
  // const [ spotImage, setSpotImage ] = useState('');
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(spotActions.addNewSpot({ address, city, state, name, description, price }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <h1>Create a new Spot</h1>
      <form onSubmit={handleSubmit} className="add-spot-form">
      <h2>Where's your place located?</h2>
      <h3>Guests will only get your exact address once they booked a reservation.</h3>
        <div className="form-group-located">
          {/* <label>Country</label>
          <input type="text"
          value={country}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Country"
           /> */}
        </div>
        <div className="form-group-located">
          <label>Street Address</label>
          <input type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          />
        </div>
        <div className="form-group-located">
          <label>City</label>
          <input type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
           />
        </div>
        <div className="form-group-located">
          <label>State</label>
          <input type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State" />
        </div>
        <h2>Describe your place to guests</h2>
        <h3>Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.</h3>
        <div className="form-group-description">
          <label>Description</label>
          <input type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxlength="30"
          placeholder='Please write at least 30 characters' />
        </div>
        <div className="form-group-title">
        <h2>Create a title for your spot</h2>
        <h3>Catch guests' attention with a spot title that highlights what makes
            your place special.</h3>
          <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of your spot" />
        </div>
        <div className="form-group-price">
        <h2>Set a base price for your spot</h2>
        <h3>Competitive pricing can help your listing stand out and rank higher
            in search results.</h3>
          <label>$</label>
          <input type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price per night (USD)" />
        </div>
        <h2>Liven up your spot with photos</h2>
        <h3>Submit a link to at least one photo to publish your spot.</h3>
        <div className="form-group-photos">
          {/* <div className="preview-photo">
            <input type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            placeholder="Preview Image URL" />
          </div>
          <div className="image-1">
            <input type="text"
            value={spotImage}
            onChange={(e) => setSpotImage(e.target.value)}
            placeholder="Image URL" />
          </div>
          <div className="image-2">
            <input type="text"
            value={spotImage}
            onChange={(e) => setSpotImage(e.target.value)}
            placeholder="Image URL" />
          </div>
          <div className="image-3">
            <input type="text"
            value={spotImage}
            onChange={(e) => setSpotImage(e.target.value)}
            placeholder='Image URL' />
          </div> */}
        </div>
        {/* ADD ERROR HANDLERS */}
        {errors && Object.keys(errors).length > 0 && (
          <div className="errors">
            {Object.keys(errors).map((key) => (
              <div key={key}>{errors[key]}</div>
            ))}
          </div>
        )}
        <div className="form-buttons">
          <button type="submit">Create Spot</button>
        </div>
      </form>
    </>
  );
}

export default AddSpotFormModal;
