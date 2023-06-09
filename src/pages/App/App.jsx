import AuthPage from "./AuthPage/AuthPage";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Map from "./Map/Map";
import AppointmentPage from "./AppointmentPage/AppointmentPage";
import SignUpForm from "./AuthPage/SignUpForm";
import UpcomingAppointment from "../UpcomingAppointment/UpcomingAppointment";
import { getUser } from "../../utilities/users-service";
import Admin from "./Admin/Admin"
import MakeupArtist from "./Admin/MakeupArtist"
import Edit from "./Admin/Edit";
import NewArtist from "./Admin/NewArtist";
import AdminLogin from "./Admin/AdminLogin";


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
        <NavBar />
        <AuthPage setUser={setUser}/>
        <Routes>
          <Route path="/maps" element={<Map/>} />
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/makeupartist/:id/*" element={<MakeupArtist/>}/>
        <Route path="/booking" element={<AppointmentPage/>} />
        <Route path={`/adminlogin`} element={<AdminLogin  />} />

        </Routes>
      </main>
    );
  } else{
    return (
      <main className="App">
        <NavBar user={user} setUser={setUser} />
        <Routes>
        <Route path="/maps" element={<Map/>} />
        <Route path="/booking" element={<AppointmentPage/>} />
        <Route path="/history" element={<UpcomingAppointment/>} />
        <Route path="/signup" element={<SignUpForm/>} />
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/makeupartist/:id/*" element={<MakeupArtist/>}/>
        <Route path={`/makeupartist/edit/:id`} element={<Edit  />} />
        <Route path="/newmakeupartist" element={<NewArtist />} />
        <Route path={`/adminlogin`} element={<AdminLogin  />} />
        

        </Routes>
        
      </main>
    );
  } 
};


export default App;