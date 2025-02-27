import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import AppStore, { persistor } from "./redux/AppStore";
import AppRoute from "./routes/AppRoute";
import { injectStore } from "./constants/axiosInstence";
const App = () => {
  injectStore(AppStore);
  return (
    <HelmetProvider>
      <Provider store={AppStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <AppRoute />
          </Router>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  )
};

export default App
