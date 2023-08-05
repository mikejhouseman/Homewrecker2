// frontend/src/index.js
import React from 'react';
import './index.css';
import ReactDom from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider, Modal } from './context/Modal';
import App from './App';
// import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client' for React 18
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}
// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
  <ModalProvider>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
        <Modal />
      </BrowserRouter>
    </ReduxProvider>
  </ModalProvider>
  );
}

// // Use createRoot instead of ReactDOM.render for React 18
// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>
// );

ReactDom.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
