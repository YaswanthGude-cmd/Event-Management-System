import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import OrganizerNavbar from "../components/organizer/OrganizerNavbar";
import OrganizerSidebar from "../components/organizer/OrganizerSidebar";

import "./OrganizerLayout.css";

const OrganizerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="organizer-layout">

      <OrganizerNavbar
        toggleSidebar={toggleSidebar}
      />

      <OrganizerSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <main className="organizer-main-content">
        <Outlet />
      </main>

    </div>
  );
};

export default OrganizerLayout;