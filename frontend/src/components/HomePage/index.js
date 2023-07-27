// frontend/src/components/HomePage/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './HomePage.css';
import Navigation from '../Navigation';
import ProfileButton from '../Navigation/ProfileButton';

const HomePage = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.list);
  console.log(spots);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(  ()  => async () => {
    await dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className="home-page">
      <Navigation isLoaded={true} />
      <div className="home-page__content">
        <div className="home-page__content__spots">
          <h2>Spots</h2>
          <ul>
            {spots?.map(spot => (
              <li key={spot.id}>
                <NavLink to={`/spots/${spot.id}`}>{spot.id}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {sessionUser && <ProfileButton key={sessionUser.id} />}
    </div>
  );
};

export default HomePage;
