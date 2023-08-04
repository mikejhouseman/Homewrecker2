import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../store/spot';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    // Load spots when the component mounts
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome to our Spot Listing Page!</h1>
      <div>
        {spots && spots.length > 0 ? (
          <div>
            {spots.map((spot) => (
              <div key={spot.id}>
                <h2>{spot.name}</h2>
                <p>{spot.description}</p>
                {/* Add other spot details you want to display */}
              </div>
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
