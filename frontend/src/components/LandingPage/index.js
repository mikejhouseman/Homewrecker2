//frontend/src/components/LandingPage/index.js
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStar } from '@fortawesome/free-solid-svg-icons';
import { getSpots  } from '../../store/spot';
import './LandingPage.css';


const LandingPage = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch ]);

  const spots = useSelector((state) => state.spot.list);



  // location.pathname

  // useEffect(() => {
  //   const fetchAvgRatings = async () => {
  //     try {
  //       const requests = spots.map((spot) => fetch(`/api/spots/${spot.id}`));
  //       const responses = await Promise.all(requests);
  //       const spotDataList = await Promise.all(responses.map((response) => response.json()));

  //       spotDataList.forEach((spotData, index) => {
  //         spots[index].avgRating = spotData.avgStarRating || null;
  //       });
  //     } catch (error) {
  //       console.error('Error fetching average ratings', error);
  //     }
  //   };
  //   fetchAvgRatings();
  // }, [spots]);

// ? on 47 means don't try to link to spot.id if spot doesn't exist
  return (
    <div className="landing-page">
      <h1>Check out your wreckable spots!</h1>
      <div className="spot-tile-list">
        {spots && spots.length > 0 ? (
          <div>
            {spots.map((spot) => (
               <div key={spot.id} className="spot-tile">
                  <NavLink to={`/spots/${spot?.id}`}>
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
                        <FontAwesomeIcon icon={faStar} /> {spot.avgStarRating}
                      </p>
                    ) : (
                      <p>New</p>
                    )}
                    <p>${spot.price} night</p>
                  </div>
                </NavLink>
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
