import * as React from "react";
import { useHistory } from "react-router";
import SettingsLayout from "../components/settings/SettingsLayout";

const Settings = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  React.useEffect(() => {
    if (!user) {
      history.push("/auth");
    }
  }, []);
  return <SettingsLayout />;
};

export default Settings;
