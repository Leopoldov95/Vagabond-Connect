import * as React from "react";
import { Grid } from "@material-ui/core";
import FriendsNav from "../components/friends/FriendsNav";
import FriendsDisplay from "../components/friends/FriendsDisplay";

const Friends = () => {
  const [selected, setSelected] = React.useState("find");
  const [loading, setLoading] = React.useState(false);
  return (
    <Grid container>
      <Grid item sm={3}>
        <FriendsNav
          setLoading={setLoading}
          selected={selected}
          setSelected={setSelected}
        />
      </Grid>
      <Grid item sm={9}>
        <FriendsDisplay
          loading={loading}
          setLoading={setLoading}
          selected={selected}
        />
      </Grid>
    </Grid>
  );
};

export default Friends;
