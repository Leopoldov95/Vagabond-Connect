// This will be the main index file to display the main application
// so have the sidebar and navbar componetns here and based on state, change whether to show home feed or account settings

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const Main = () => {
  return (
    <div className="Main">
      <Navbar />
      <CssBaseline />
      <Container maxWidth="lg">
        <Sidebar />
        <h1>This is the primary main page</h1>
      </Container>
    </div>
  );
};

export default Main;
