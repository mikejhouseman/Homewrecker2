// frontend/src/store/spot.js

// action types
const LOAD_SPOTS = 'spot/LOAD_SPOTS';
const SPOT_DETAILS = 'spot/SPOT_DETAILS';
const ADD_SPOT = 'spot/ADD_SPOT';
const EDIT_SPOT = 'spot/EDIT_SPOT';
const DELETE_SPOT = 'spot/DELETE_SPOT';
const ADD_REVIEW = 'spot/ADD_REVIEW';
const ADD_IMAGE = 'spot/ADD_IMAGE';
const GET_REVIEWS = 'spot/GET_REVIEWS';
const GET_BOOKINGS = 'spot/GET_BOOKINGS';
const ADD_BOOKING = 'spot/ADD_BOOKING';
const DELETE_IMAGE = 'spot/DELETE_IMAGE';

// action creators
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

const addReview = (review) => ({
  type: ADD_REVIEW,
  review
});

const addImage = (image) => ({
  type: ADD_IMAGE,
  image
});

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
});

const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings
});

const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking
});

const deleteImage = (imageId) => ({
  type: DELETE_IMAGE,
  imageId
});

// thunks
export const getSpots = () => async (dispatch) => {
  try {
    const response = await fetch('/api/spots');
    if (!response.ok) {
      throw new Error('Failed to fetch spots from the server.');
    }
    const { Spots } = await response.json();
    dispatch(loadSpots(Spots));
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
    dispatch(spotDetails(detailedSpot));
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
    dispatch(addSpot(newSpot));
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
    dispatch(editSpot(updatedSpot));
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
    dispatch(deleteSpot(deletedSpot));
  } catch (error) {
    console.error('Error deleting spot:', error);
  }
};

export const addReviewToSpot = (spotId, review) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    if (!res.ok) {
      throw new Error('Failed to add review to the spot.');
    }
    const addedReview = await res.json();
    dispatch(addReview(addedReview));
  } catch (error) {
    console.error('Error adding review to the spot:', error);
  }
};

export const addImageToSpot = (spotId, image) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(image),
    });
    if (!res.ok) {
      throw new Error('Failed to add image to the spot.');
    }
    const addedImage = await res.json();
    dispatch(addImage(addedImage));
  } catch (error) {
    console.error('Error adding image to the spot:', error);
  }
};

export const getSpotReviews = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}/reviews`);
    if (!res.ok) {
      throw new Error('Failed to fetch spot reviews from the server.');
    }
    const reviews = await res.json();
    dispatch(getReviews(reviews));
  } catch (error) {
    console.error('Error fetching spot reviews:', error);
  }
};

export const getSpotBookings = (spotId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}/bookings`);
    if (!res.ok) {
      throw new Error('Failed to fetch spot bookings from the server.');
    }
    const bookings = await res.json();
    dispatch(getBookings(bookings));
  } catch (error) {
    console.error('Error fetching spot bookings:', error);
  }
};

export const addBookingToSpot = (spotId, booking) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/${spotId}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });
    if (!res.ok) {
      throw new Error('Failed to add booking to the spot.');
    }
    const addedBooking = await res.json();
    dispatch(addBooking(addedBooking));
  } catch (error) {
    console.error('Error adding booking to the spot:', error);
  }
};

export const deleteSpotImage = (imageId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/spots/images/${imageId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete image from the spot.');
    }
    const deletedImage = await res.json();
    dispatch(deleteImage(deletedImage.id));
  } catch (error) {
    console.error('Error deleting image from the spot:', error);
  }
};

const initialState = { spots: null, current: null };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:
      newState = Object.assign({}, state);
      newState.spots = action.spots;
      return newState;
    case SPOT_DETAILS:
      newState = Object.assign({}, state);
      newState.current = action.spot;
      return newState;
    case ADD_SPOT:
      newState = Object.assign({}, state);
      newState.spots.push(action.spot);
      return newState;
    case EDIT_SPOT:
      newState = Object.assign({}, state);
      const indexToEdit = newState.spots.findIndex(spot => spot.id === action.spot.id);
      if (indexToEdit !== -1) {
        newState.spots[indexToEdit] = action.spot;
      }
      return newState;
    case DELETE_SPOT:
      newState = Object.assign({}, state);
      newState.spots = newState.spots.filter(spot => spot.id !== action.spot.id);
      return newState;
    case ADD_REVIEW:
      newState = Object.assign({}, state);
      newState.current.reviews.push(action.review);
      return newState;
    case ADD_IMAGE:
      newState = Object.assign({}, state);
      newState.current.images.push(action.image);
      return newState;
    case GET_REVIEWS:
      newState = Object.assign({}, state);
      newState.current.reviews = action.reviews;
      return newState;
    case GET_BOOKINGS:
      newState = Object.assign({}, state);
      newState.current.bookings = action.bookings;
      return newState;
    case ADD_BOOKING:
      newState = Object.assign({}, state);
      newState.current.bookings.push(action.booking);
      return newState;
    case DELETE_IMAGE:
      newState = Object.assign({}, state);
      newState.current.images = newState.current.images.filter(image => image.id !== action.imageId);
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
