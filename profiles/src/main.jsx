import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Profiles from "./Pages/Profiles";
import Admin from "./Pages/Admin";
import 'leaflet/dist/leaflet.css';
import MapPage from "./Pages/Map";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Profiles />} />
      <Route path={`/map/:city`} element={<MapPage />} />
      <Route path={`/admin`} element={<Admin />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);