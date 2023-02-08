import { Grid } from "@mui/material";
import React from "react";
import Banner from "../../component/banner";
import Categories from "./categories";

const Home = () => {
  return (
    <>
      <Banner />

      <Grid container>
        <Grid item lg={3} sm={2} xs={12}>
          <Categories />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          Post list
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
