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
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
});

export const spotDetails = (spot) => ({
  type: SPOT_DETAILS,
  spot
});

export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot
});

export const editSpot = (spot) => ({
  type: EDIT_SPOT,
  spot
});

export const deleteSpot = (spot) => ({
  type: DELETE_SPOT,
  spot
});

export const addReview = (review) => ({
  type: ADD_REVIEW,
  review
});

export const addImage = (image) => ({
  type: ADD_IMAGE,
  image
});

export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
});

export const getBookings = (bookings) => ({
  type: GET_BOOKINGS,
  bookings
});

export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking
});

export const deleteImage = (imageId) => ({
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
    const res = await fetch(`/api/spots/${spotId}`);
    const spotData = await res.json();
    if (!res.ok) {
    const spotData = await res.json();
    dispatch(spotDetails(spotData));
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

const initialState = { list: [], current: [], details: {} };

const spotReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case LOAD_SPOTS:
      return {
        ...state,
        list: action.spots,
      };
    case SPOT_DETAILS:
      // newState = { ...state, currentSpot: action.spot };
      // return newState;
      return {
        ...state,
        details: action.spot,
      };
    case ADD_SPOT:
      return {
        ...state,
        list: [...state.list, action.spot],
      };
    case EDIT_SPOT:
      return {
        ...state,
        list: state.list.map((spot) =>
          spot.id === action.spot.id ? action.spot : spot
        ),
      };
    case DELETE_SPOT:
      return {
        ...state,
        list: state.list.filter((spot) => spot.id !== action.spot.id),
      };
    case ADD_REVIEW:
      return {
        ...state,
        current: {
          ...state.current,
          reviews: [...state.current.reviews, action.review],
        },
      };
    case ADD_IMAGE:
      return {
        ...state,
        current: {
          ...state.current,
          images: [...state.current.images, action.image],
        },
      };
    case GET_REVIEWS:
      return {
        ...state,
        current: {
          ...state.current,
          reviews: action.reviews,
        },
      };
    case GET_BOOKINGS:
      return {
        ...state,
        current: {
          ...state.current,
          bookings: action.bookings,
        },
      };
    case ADD_BOOKING:
      return {
        ...state,
        current: {
          ...state.current,
          bookings: [...state.current.bookings, action.booking],
        },
      };
    case DELETE_IMAGE:
      return {
        ...state,
        current: {
          ...state.current,
          images: state.current.images.filter((image) => image.id !== action.imageId),
        },
      };
    default:
      return state;
  }
};

export default spotReducer;
