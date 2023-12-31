import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./screens/Login.js";
import Register from "./screens/Register";
import Dashboard from "./components/Dashboard";
import Home from "./screens/Home";

/* Train_Management */
import CreateTrain from "./screens/Train_Management/CreateTrain";
import CreateTrainSchedule from "./screens/Train_Management/CreateTrainSchedule";
import UpdateTrainSchedule from "./screens/Train_Management/UpdateTrainSchedule";
import ExisitingTrainSchedule from "./screens/Train_Management/ExisitingTrainSchedule";
import AllTrains from "./screens/Train_Management/AllTrains";

/* Ticket_Management */
import CreateTicket from "./screens/Ticket_Management/CreateTicket";
import UpdateTicket from "./screens/Ticket_Management/UpdateTicket";
import TicketDetails from "./screens/Ticket_Management/TicketDetails";

/* Traveler_Management */
import CreateTraveler from "./screens/Traveler_Management/CreateTraveler";
import UpdateTraveler from "./screens/Traveler_Management/UpdateTraveler";
import TravelInfo from "./screens/Traveler_Management/TravelInfo";
import Reservation from "./screens/Ticket_Management/Reservation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />

        {/* Train_Management */}
        <Route path="/train" element={<CreateTrain />} />
        <Route path="/trainschedule" element={<CreateTrainSchedule />} />
        <Route path="/updateschedule/:id" element={<UpdateTrainSchedule />} />
        <Route path="/schedule" element={<ExisitingTrainSchedule />} />
        <Route path="/alltrains" element={<AllTrains />} />

        {/* Ticket_Management */}
        <Route path="/createTicket" element={<CreateTicket />} />
        <Route path="/updateTicket/:id" element={<UpdateTicket />} />
        <Route path="/details" element={<TicketDetails />} />
        <Route path="/reserve" element={<Reservation />} />

        {/* Traveler_Management */}
        <Route path="/createTraveler" element={<CreateTraveler />} />
        <Route path="/updateTraveler/:id" element={<UpdateTraveler />} />
        <Route path="/travelInfo" element={<TravelInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
