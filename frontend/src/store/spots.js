// // frontend/src/store/spots.js

const LOAD_SPOTS = 'spots/LOAD_SPOTS';

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

export const getSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots');

  if (response.ok) {
    const spots = [{ id: 1, name: 'Spot 1' }, { id: 2, name: 'Spot 2' }];
    dispatch({ type: 'LOAD_SPOTS', spots });
  }
};

const initialState = {};

const sortList = (list) => {
  return list.sort((spotA, spotB) => {
    return spotA.name.localeCompare(spotB.name);
  }).map(spot => spot.id);
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      console.log('action.spots:', action.spots);
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
