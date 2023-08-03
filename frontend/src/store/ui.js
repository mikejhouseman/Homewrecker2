// frontend/src/store/ui.js
const HIDE_AUTH_BUTTONS = 'ui/HIDE_AUTH_BUTTONS';
const SHOW_AUTH_BUTTONS = 'ui/showAuthButtons';

export const hideAuthButtons = () => ({
  type: HIDE_AUTH_BUTTONS,
});

export const showAuthButtons = () => ({
  type: SHOW_AUTH_BUTTONS,
});

const initialState = {
  authButtonsHidden: false,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_AUTH_BUTTONS:
      return { ...state, authButtonsHidden: true };
    case SHOW_AUTH_BUTTONS:
      return { ...state, authButtonsHidden: false };
    default:
      return state;
  }
}
