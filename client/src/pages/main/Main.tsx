// This will be the main index file to display the main application
// so have the sidebar and navbar componetns here and based on state, change whether to show home feed or account settings

import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";

const Main = () => {
  return (
    <div className="Main">
      <Navbar />
    </div>
  );
};

export default Main;
