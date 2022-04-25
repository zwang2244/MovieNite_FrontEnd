import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

function AuthButton({ children }) {
  return (
    <Box component={"form"}>
      <LoadingButton
        sx={{
          // backgroundColor: "#2065d1",
          backgroundColor: "#212B36",
          borderRadius: "8px",
          height: "45px",
          textTransform: "capitalize",
          fontWeight: 700,
          fontSize: "0.92rem",
          "&:hover": {
            backgroundColor: "#1f3148",
          },
        }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={false}
      >
        {children}
      </LoadingButton>
    </Box>
  );
}

export default AuthButton;
