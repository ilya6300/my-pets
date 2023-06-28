import "./style/App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import React from "react";
import { Page404 } from "./pages/Page404";
import { HomePage } from "./pages/HomePage";
import { HomeLocationPage } from "./pages/HomeLocationPage";
import { StreetLocation } from "./pages/StreetLocation";
import { VetClinicPage } from "./pages/VetClinicPage";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="homelocation" element={<HomeLocationPage />}></Route>
          <Route path="homelocation/:id" element={<HomeLocationPage />}></Route>
          <Route path="streetlocation" element={<StreetLocation />}></Route>
          <Route path="streetlocation/:id" element={<StreetLocation />}></Route>
          <Route path="vetClinicPage" element={<VetClinicPage />}></Route>
          <Route path="vetClinicPage/:id" element={<VetClinicPage />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
