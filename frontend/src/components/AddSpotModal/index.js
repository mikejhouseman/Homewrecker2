import React, { useRef, useEffect, useState } from "react";
import * as spotActions from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./AddSpotModal.css";

function AddSpotModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closeModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const address = addressRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;
    const lat = latRef.current.value;
    const lng = lngRef.current.value;
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;

    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    try {
      const createdSpot = await dispatch(spotActions.addNewSpot(newSpot));
      closeModal();
      history.push(`/spots/${createdSpot.id}`);
      addressRef.current.value = "";
      cityRef.current.value = "";
      stateRef.current.value = "";
      countryRef.current.value = "";
      latRef.current.value = "";
      lngRef.current.value = "";
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      priceRef.current.value = "";
      setErrors({});
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      }
    }
  };

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Redirect to="/login" />;
  }

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>Create a New Spot</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Address
            <input type="text" ref={addressRef} required />
          </label>
          {errors.address && <p className="error">{errors.address}</p>}
          <label>
            City
            <input type="text" ref={cityRef} required />
          </label>
          {errors.city && <p className="error">{errors.city}</p>}
          <label>
            State
            <input type="text" ref={stateRef} />
          </label>
          {errors.state && <p className="error">{errors.state}</p>}
          <label>
            Country
            <input type="text" ref={countryRef} required />
          </label>
          {errors.country && <p className="error">{errors.country}</p>}
          <label>
            Lat
            <input type="number" ref={latRef} required />
          </label>
          {errors.lat && <p className="error">{errors.lat}</p>}
          <label>
            Lng
            <input type="number" ref={lngRef} required />
          </label>
          {errors.lng && <p className="error">{errors.lng}</p>}
          <label>
            Name
            <input type="text" ref={nameRef} required />
          </label>
          {errors.name && <p className="error">{errors.name}</p>}
          <label>
            Description
            <textarea ref={descriptionRef} required />
          </label>
          {errors.description && <p className="error">{errors.description}</p>}
          <label>
            Price
            <input type="number" ref={priceRef} required />
          </label>
          {errors.price && <p className="error">{errors.price}</p>}
          <div className="button-container">
            <button type="submit">Submit Spot</button>
            <button type="cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSpotModal;
