import { Typography, styled, Box } from "@mui/material";

import React from "react";
// background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
// center/55% repeat-x #000;
const Image = styled(Box)`
  width: 100%;
  background: #4169e1 center/55% repeat-x;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Heading = styled(Typography)`
  font-size: 70px;
  color: white;
  line-height: 1;
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: white;
  padding-left: 3px;
  padding-right: 3px;
`;

const Banner = () => {
  return (
    <div>
      <Image>
        <Heading>BLOG</Heading>
        <SubHeading>Blog Name</SubHeading>
      </Image>
    </div>
  );
};

export default Banner;
