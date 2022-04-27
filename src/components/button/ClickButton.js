import React from "react";
import { LoadingButton } from "@mui/lab";

function ClickButton({
  backgroundColor,
  backgroundColorAfterHover,
  children,
  onClick,
  color,
}) {
  return (
    <LoadingButton
      onClick={onClick}
      sx={{
        // backgroundColor: "#2065d1",
        backgroundColor: backgroundColor,
        borderRadius: "8px",
        height: "45px",
        textTransform: "capitalize",
        fontWeight: 700,
        boxShadow: "none",
        color: color ? color : null,
        fontSize: "0.92rem",
        "&:hover": {
          backgroundColor: backgroundColorAfterHover,
          boxShadow: "none",
        },
      }}
      size="small"
      variant="contained"
      loading={false}
    >
      {children}
    </LoadingButton>
  );
}

export default ClickButton;
