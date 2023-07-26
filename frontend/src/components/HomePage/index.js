// frontend/src/components/HomePage/index.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './HomePage.css';
import Navigation from '../Navigation';
import ProfileButton from '../Navigation/ProfileButton';

const HomePage = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className="home-page">
      <Navigation isLoaded={true} />
      <div className="home-page__content">
        <div className="home-page__content__spots">
          <h2>Spots</h2>
          <ul>
            {/* Add a check for spots.list before mapping */}
            {spots.list &&
              spots.list.map(spotId => (
                <li key={spotId}>
                  <NavLink to={`/spots/${spotId}`}>{spots[spotId].name}</NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <ProfileButton />
    </div>
  );
};

export default HomePage;
