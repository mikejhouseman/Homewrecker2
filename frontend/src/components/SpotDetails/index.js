// frontend/src/components/SpotDetails/index.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotActions from '../../store/spot';
import * as reviewActions from '../../store/review';
// import { getSpotDetails, deleteExistingSpot } from '../../store/spot';
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spot.details);
  const reviews = useSelector((state) => state.review.list ? state.review.list : null);



// IN OTHER SITES, THE STATE.SPOT.DETAILS NEEDS TO MATCH THE PROPERTY IN THE REDUCER
  // const spot = useSelector((state) => state.spot.list[spotId]);



  useEffect(() => {
    // dispatch( getSpotDetails(spotId));
    dispatch(getSpotDetails(spotId));
  }, [dispatch, spotId]);

  const handleDeleteImage = (imageId) => {
    // Handle the deletion of an image here
    dispatch(deleteExistingSpot(imageId));
  };

  if (!spot) {
    // Render a loading state or return null when the data is still loading
    return <div>Loading...</div>;
  }

  const handleReserveClick = () => {
    alert('Feature coming soon');
  };

  //SHOW ALL RATINGS AND REVIEWS FOR THE SPOT

  // IF THE USER IS NOT THE OWNER OF THE SPOT,
  // SHOW THE REVIEWFORMMODALBUTTON
  // ADD ${spot?.country} AFTER ADDING COUNTRY TO SPOT MODEL AND MIGRATION AND SEEDERS



  // return
  // (
  //   <div className="spot-details-container">
  //     <div className="spot-details-heading">
  //       <h1>{spot?.name}</h1>
  //       <h2>Location: {`${spot?.city}, ${spot?.state}`}</h2>
  //     </div>
  //     <div className="spot-details-icons">
  //       <div className="spot-details-large-icon">
  //         <img src={spot?.largeImage} alt={`Large image of ${spot?.name}`} />
  //       </div>
  //       <div className="spot-details-small-icons">
  //         {spot?.smallImages.map((image, index) => (
  //           <div key={index}>
  //             <img src={image} alt={`Small image ${index + 1} of ${spot?.name}`} />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //     <div className="spot-details-host">
  //       <h3>Hosted by {`${spot?.user.firstName} ${spot?.user.lastName}`}</h3>
  //     </div>
  //     <div className="spot-details-description">
  //       <p>{spot?.description}</p>
  //     </div>
  //     <div className="spot-details-callout">
  //       <p>Price: ${spot?.price} per night</p>
  //       <button onClick={handleReserveClick}>Reserve</button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="spot-details-container">
      <div className="spot-details-heading">
        <h1>{spot?.name}</h1>
        <h2>Location: {`${spot?.city}, ${spot?.state}`}</h2>
      </div>
      <div className="spot-details-icons">
        <div className="spot-details-large-icon">
          <img src={spot?.largeImage} alt={`Large image of ${spot?.name}`} />
        </div>
        <div className="spot-details-small-icons">
          {spot?.smallImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Small image ${index + 1} of ${spot?.name}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="spot-details-host">
        <h3>Hosted by {`${spot?.user.firstName} ${spot?.user.lastName}`}</h3>
      </div>
      <div className="spot-details-description">
        <p>{spot?.description}</p>
      </div>
      <div className="spot-details-callout">
        <p>Price: ${spot?.price} per night</p>
        <button onClick={handleReserveClick}>Reserve</button>
      </div>
      {/* Add your reviews and bookings sections here */}
    </div>
  );
};

export default SpotDetails;
