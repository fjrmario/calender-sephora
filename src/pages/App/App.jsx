import NewOrderPage from "./NewOrderPage/NewOrderPage";
import AuthPage from "./AuthPage/AuthPage";
import OrderHistoryPage from "./OrderHistoryPage/OrderHistoryPage";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Map from "./Map/Map";
import AppointmentPage from "./AppointmentPage/AppointmentPage";
import SignUpForm from "./AuthPage/SignUpForm";


const App = () => {
  //user === null;

  const [user, setUser] = useState("");

  if (user === null) {
    return (
      <main className="App">
        <NavBar />
        <AuthPage setUser={setUser}/>
      </main>
    );
  } else{
    return (
      <main className="App">
        <NavBar user={user} />
        <Routes>
        <Route path="/orders/new" element={<NewOrderPage />} />
        <Route path="/orders" element={<OrderHistoryPage/>} />
        <Route path="/maps" element={<Map/>} />
        <Route path="/booking" element={<AppointmentPage/>} />
        <Route path="/signup" element={<SignUpForm/>} />
        </Routes>
        
      </main>
    );
  } 
};


export default App;



// export default App;
