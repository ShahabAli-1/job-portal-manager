import React from "react";
import { Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Welcome to the Job Portal
      </Typography>
    </Box>
  );
};

export default Header;
