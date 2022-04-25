import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function TitleAndDetail({ title, detail }) {
  return (
    <Box>
      <Typography textAlign={"left"} fontSize={"24px"} fontWeight={700}>
        {title}
      </Typography>
      <Typography textAlign={"left"} fontSize={"16px"} color={"#637381"}>
        {detail}
      </Typography>
    </Box>
  );
}

export default TitleAndDetail;
