import NewOrderPage from "./NewOrderPage/NewOrderPage";
import AuthPage from "./AuthPage/AuthPage";
import OrderHistoryPage from "./OrderHistoryPage/OrderHistoryPage";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Map from "./Map/Map";
import AppointmentPage from "./AppointmentPage/AppointmentPage";
import SignUpForm from "./AuthPage/SignUpForm";
import UpcomingAppointment from "../UpcomingAppointment/UpcomingAppointment";
// import { getUser } from "../../utilities/users-api";
import { getUser } from "../../utilities/users-service";


const App = () => {

  const [user, setUser] = useState(getUser());

  if (user === null) {
    // return (
    //   <main className="App">
    //     {/* <NavBar /> */}
    //     <Routes>
    //         <Route path="/*" element={<AuthPage/>}/>
    //     </Routes>
    //   </main>
    // );
    return (
      <main className="App">
        <AuthPage setUser={setUser}/>
      </main>
    );
  } else{
    return (
      <main className="App">
        <NavBar user={user} setUser={setUser} />
        <Routes>
        <Route path="/orders/new" element={<NewOrderPage />} />
        <Route path="/orders" element={<OrderHistoryPage/>} />
        <Route path="/maps" element={<Map/>} />
        <Route path="/booking" element={<AppointmentPage/>} />
        <Route path="/history" element={<UpcomingAppointment/>} />
        <Route path="/signup" element={<SignUpForm/>} />
        </Routes>
        
      </main>
    );
  } 
};


export default App;