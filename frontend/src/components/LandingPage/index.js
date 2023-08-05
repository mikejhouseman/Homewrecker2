import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spot';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot.list);
  const location = useLocation();

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch, location.pathname]);

  return (
    <div>
      <h1>Check out your wreckable spots!</h1>
      <div className="spot-tile-list">
        {spots && spots.length > 0 ? (
          <div>
            {spots.map((spot) => (
              <div key={spot.id} className="spot-tile">
                <Link to={`/spots/${spot.id}`}>
                  <div>
                    <div className="spot-thumbnail-placeholder">No Image Available</div>
                    <div className="tooltip">{spot.name}</div>
                    <h2>{spot.name}</h2>
                    <p>{spot.city}</p>
                    <p>{spot.state}</p>
                    <p>{spot.price}</p>
                  </div>
                </Link>
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
