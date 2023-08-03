// frontend/src/store/ui.js
const HIDE_AUTH_BUTTONS = 'ui/HIDE_AUTH_BUTTONS';

export const hideAuthButtons = () => ({
  type: HIDE_AUTH_BUTTONS,
});

const initialState = {
  authButtonsHidden: false,
};

const uiReducer = (state = initialState, action) => {
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

export default uiReducer;
