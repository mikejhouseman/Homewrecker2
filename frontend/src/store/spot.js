// frontend/src/store/spot.js
const LOAD_SPOTS = 'spot/LOAD_SPOTS';
const SPOT_DETAILS = 'spot/SPOT_DETAILS';
const ADD_SPOT = 'spot/ADD_SPOT';
const EDIT_SPOT = 'spot/EDIT_SPOT';
const DELETE_SPOT = 'spot/DELETE_SPOT';

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

const spotDetails = (spot) => ({
  type: SPOT_DETAILS,
  spot
});

const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot
});

const editSpot = (spot) => ({
  type: EDIT_SPOT,
  spot
});

const deleteSpot = (spot) => ({
  type: DELETE_SPOT,
  spot
});

export const getSpots = () => async (dispatch) => {
  try {
    const response = await fetch('/api/spots');
    if (!response.ok) {
      throw new Error('Failed to fetch spots from the server.');
    }
    const { Spots } = await response.json(); // Update to extract the 'Spots' property
    await dispatch(loadSpots(Spots)); // Use the extracted 'Spots' array
  } catch (error) {
    console.error('Error fetching spots:', error);
  }
};

export const getSpotDetails = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch spot details from the server.');
    }
    const detailedSpot = await res.json();
    await dispatch(spotDetails(detailedSpot));
  } catch (error) {
    console.error('Error fetching spot details:', error);
  }
};

export const addNewSpot = (spot) => async (dispatch) => {
  try {
    const res = await fetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spot),
    });
    if (!res.ok) {
      throw new Error('Failed to add spot to the server.');
    }
    const newSpot = await res.json();
    await dispatch(addSpot(newSpot));
  } catch (error) {
    console.error('Error adding spot:', error);
  }
};

export const editExistingSpot = (spot) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spot.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spot),
    });
    if (!res.ok) {
      throw new Error('Failed to edit spot on the server.');
    }
    const updatedSpot = await res.json();
    await dispatch(editSpot(updatedSpot));
  } catch (error) {
    console.error('Error editing spot:', error);
  }
};

export const deleteExistingSpot = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete spot from the server.');
    }
    const deletedSpot = await res.json();
    await dispatch(deleteSpot(deletedSpot));
  } catch (error) {
    console.error('Error deleting spot:', error);
  }
};

const initialState = {
  list: {},
  users: {},
};


const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const allSpots = { ...state };
      action.spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return allSpots;
    }
    case SPOT_DETAILS: {
      const newState = { ...state };
      newState.list[action.spot.id] = action.spot;
      newState.users[action.spot.Owner.id] = action.spot.Owner;
      return newState; // Return the updated state
    }
    case ADD_SPOT: {
      const newState = { ...state };
      newState.list[action.spot.id] = action.spot;
      return newState; // Return the updated state
    }
    case EDIT_SPOT: {
      const newState = { ...state };
      newState.list[action.spot.id] = action.spot;
      return newState;
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState.list[action.spot.id];
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
