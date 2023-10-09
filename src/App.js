import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./screens/Login.js";
import Register from "./screens/Register";
import Dashboard from './components/Dashboard';
import CreateTrainSchedule from "./screens/Train_Management/CreateTrainSchedule";
import UpdateTrainSchedule from "./screens/Train_Management/UpdateTrainSchedule";
import ExisitingTrainSchedule from "./screens/Train_Management/ExisitingTrainSchedule";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trainschedule" element={<CreateTrainSchedule />} />
        <Route path="/updateschedule" element={<UpdateTrainSchedule />} />
        <Route path="/schedule" element={<ExisitingTrainSchedule />} />
      </Routes>
    </BrowserRouter>
  );
}
