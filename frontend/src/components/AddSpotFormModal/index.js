import React, { useState } from 'react';
import * as spotActions from '../../store/spot';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import './AddSpotFormModal.css';


function AddSpotFormModal() {
  const dispatch = useDispatch();
  const [ address, setAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ state, setState ] = useState('');
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ errors, setErrors ] = useState({}); // TODO: Add error handling
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
      <h2>Add a New Spot</h2>
      <form onSubmit={handleSubmit} className="add-spot-form">
        {/* Add your form fields here */}
        <div className="form-group">
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="form-group">
          <label>State</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        {errors && Object.keys(errors).length > 0 && (
          <div className="errors">
            {Object.keys(errors).map((key) => (
              <div key={key}>{errors[key]}</div>
            ))}
          </div>
        )}
        <div className="form-buttons">
          <button type="submit">Add Spot</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default AddSpotFormModal;
