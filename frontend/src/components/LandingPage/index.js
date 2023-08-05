//frontend/src/components/LandingPage/index.js
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStar } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot.list);
  const location = useLocation();

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch, location.pathname]);

  useEffect(() => {
    const fetchAvgRatings = async () => {
      try {
        for (const spotId in spots) {
          const response = await fetch(`/api/spots/${spotId}`);
          if (response.ok) {
            const spotData = await response.json();
            spots[spotId].avgRating = spotData.avgStarRating || null;
          }
        }
      } catch (error) {
        console.error('Error fetching average ratings', error);
      }
    };
    fetchAvgRatings();
  }, [spots]);

  return (
    <div>
      <h1>Check out your wreckable spots!</h1>
      <div className="spot-tile-list">
        {spots && spots.length > 0 ? (
          <div>
            {spots.map((spot) => (
              <div key={spot.id} className="spot-tile">
                <Link to={`/spots/${spot.id}`}>
                  <div tooltip={spot.name}>
                    {spot.image ? (
                      <img src={spot.image} alt={spot.name} />
                    ) : (
                      <div className="spot-thumbnail-placeholder">
                        <FontAwesomeIcon icon={faHouse} />
                      </div>
                    )}
                    <p>{spot.city}</p>
                    <p>{spot.state}</p>
                    {spot.avgRating ? (
                      <p>
                        <FontAwesomeIcon icon={faStar} /> {spot.avgRating.toFixed(2)}
                      </p>
                    ) : (
                      <p>New</p>
                    )}
                    <p>${spot.price} night</p>
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
