import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar";
import AppointmentPage from "../Appointments/AppointmentPage"
import "./App.css";

const App = () => {

      <main className="App">
        <NavBar />
        <Routes>
        <Route path="/booking" element={<AppointmentPage/>} />
        </Routes>
        
      </main>

  } 



export default App;



// export default App;
