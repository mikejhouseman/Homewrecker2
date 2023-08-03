// frontend/src/store/login.js
const HIDE_AUTH_BUTTONS = 'login/HIDE_AUTH_BUTTONS';

export const hideAuthButtons = () => ({
  type: HIDE_AUTH_BUTTONS,
});

const initialState = {
  authButtonsHidden: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_AUTH_BUTTONS:
      return {
        ...state,
        authButtonsHidden: true,
      };
    default:
      return state;
  }
};

export default loginReducer;
