import React from "react";
import { Outlet } from "react-router-dom";

import OrganizerNavbar from "../components/organizer/OrganizerNavbar";
import OrganizerSidebar from "../components/organizer/OrganizerSidebar";

const OrganizerLayout = () => {
  return (
    <div>
      <OrganizerNavbar />

      <OrganizerSidebar />

      <main
        style={{
          marginLeft: "240px",
          paddingTop: "65px",
          minHeight: "100vh",
          backgroundColor: "#f3f4f6"
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizerLayout;