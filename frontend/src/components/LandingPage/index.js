import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot.list);

// ADD ABILITY TO SHOW ADDSPOTMODALFORM HERE IF THE USER IS LOGGED IN.


  useEffect(() => {
    // Load spots when the component mounts
    dispatch(spotActions.getSpots());
  }, [dispatch]);

  return (
    <div>
      <h1>Check out your wreckable spots!</h1>
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
