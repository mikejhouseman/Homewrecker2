// frontend/src/components/SpotDetails/index.js
import React from 'react';
import { useSelector } from 'react-redux';

const SpotDetails = () => {
  const spot = useSelector((state) => state.spots.current);

  if (!spot) {
    return <p>Loading spot details...</p>;
  }

  const handleReserveClick = () => {
    alert('Feature coming soon');
  };

  //SHOW ALL RATINGS AND REVIEWS FOR THE SPOT

  // IF THE USER IS NOT THE OWNER OF THE SPOT,
  // SHOW THE REVIEWFORMMODALBUTTON



  return (
    <div className="spot-details-container">
      <div className="spot-details-header">
        <h1>{spot.name}</h1>
        <p>Location: {`${spot.city}, ${spot.state}, ${spot.country}`}</p>
      </div>
      <div className="spot-details-images">
        <div className="spot-details-large-image">
          <img src={spot.largeImage} alt={`Large image of ${spot.name}`} />
        </div>
        <div className="spot-details-small-images">
          {spot.smallImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Small image ${index + 1} of ${spot.name}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="spot-details-host">
        <p>Hosted by {`${spot.host.firstName} ${spot.host.lastName}`}</p>
      </div>
      <div className="spot-details-description">
        <p>{spot.description}</p>
      </div>
      <div className="spot-details-callout">
        <p>Price: ${spot.price} per night</p>
        <button onClick={handleReserveClick}>Reserve</button>
      </div>
    </div>
  );
};

export default SpotDetails;
