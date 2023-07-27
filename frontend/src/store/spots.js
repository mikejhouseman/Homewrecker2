// // frontend/src/store/spots.js
const LOAD_SPOTS = 'spots/LOAD_SPOTS';

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
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

const initialState = {
  list: [],
};

const sortList = (list) => {
  return list.sort((spotA, spotB) => {
    return spotA.name.localeCompare(spotB.name);
  }).map(spot => spot.id);
};

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const allSpots = {};
      action.spots.forEach(spot => {
        allSpots[spot.id] = spot;
      });
      return {
        ...state,
        ...allSpots,
        list: sortList(Object.values(allSpots))
      };
    }
    default:
      return state;
  }
};

export default spotsReducer;
