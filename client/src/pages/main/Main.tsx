// This will be the main index file to display the main application
// so have the sidebar and navbar componetns here and based on state, change whether to show home feed or account settings

import React from "react";
import Navbar from "../../components/Navbar";
const Main = () => {
  return (
    <div className="Main">
      <Navbar />
      <h1>This is the primary main page</h1>
    </div>
  );
};

export default Main;
