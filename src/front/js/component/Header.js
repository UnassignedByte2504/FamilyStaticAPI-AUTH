import React from "react";
import { Typography, Box} from "@mui/material";
import TextField from "@mui/material";


const Header = ({ title, subtitle }) => {

  return (
    <Box mb="30px">
      <Typography
        variant="h5"
        color="#e0e0e0"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color="#70d8bd">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;