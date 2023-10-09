import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./screens/Login.js";
import Register from "./screens/Register";
import Dashboard from './components/Dashboard';
import CreateTrainSchedule from "./screens/Train_Management/CreateTrainSchedule";
import UpdateTrainSchedule from "./screens/Train_Management/UpdateTrainSchedule";
import ExisitingTrainSchedule from "./screens/Train_Management/ExisitingTrainSchedule";
import CreateTicket from './screens/Ticket_Management/CreateTicket';
import UpdateTicket from "./screens/Ticket_Management/UpdateTicket";
import CreateTraveler from "./screens/Traveler_Management/CreateTraveler";
import UpdateTraveler from "./screens/Traveler_Management/UpdateTraveler";
import TravelInfo from "./screens/Traveler_Management/TravelInfo";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/trainschedule" element={<CreateTrainSchedule />} />
        <Route path="/updateschedule" element={<UpdateTrainSchedule />} />
        <Route path="/schedule" element={<ExisitingTrainSchedule />} />
        <Route path="/createTicket" element={<CreateTicket />} /> 
        <Route path="/updateTicket" element={<UpdateTicket />} /> 
        <Route path="/createTraveler" element={<CreateTraveler />} /> 
        <Route path="/updateTraveler" element={<UpdateTraveler />} /> 
        <Route path="/travelInfo" element={<TravelInfo />} /> 
      </Routes>
    </BrowserRouter>
  );
}
