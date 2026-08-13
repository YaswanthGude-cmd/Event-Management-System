import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyRegistrations from "./pages/MyRegistrations";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default page */}
        <Route path="/" element={<Login />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;