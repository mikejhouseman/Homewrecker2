import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots, getSpotDetails } from '../../store/spot';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot.list);

// ADD ABILITY TO SHOW ADDSPOTMODALFORM HERE IF THE USER IS LOGGED IN.


useEffect(() => {
  dispatch(getSpots());
}, [dispatch]);

const handleSpotClick = (spotId) => {
  dispatch(getSpotDetails(spotId));
};

  return (
    <div>
      <h1>Check out your wreckable spots!</h1>
      <div className="spot-tile-list">
        {spots && spots.length > 0 ? (
          <div>
            {spots.map((spot) => (
              <Link key={spot.id} to={`/spots/${spot.id}`}>
                <div onClick={() => handleSpotClick(spot.id)}>
                  <img
                    src={spot.images.length > 0 ? spot.images[0].url : 'placeholder.jpg'}
                    alt={`Spot ${spot.name}`}
                  />
                  <h2>{spot.name}</h2>
                  <p>{spot.city}</p>
                  <p>{spot.state}</p>
                  <p>{spot.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No spots available.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
