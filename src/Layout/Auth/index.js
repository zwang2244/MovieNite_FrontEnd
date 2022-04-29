import React, { useState } from "react";
import { Box, Link } from "@mui/material";
import Paper from "@mui/material/Paper";
import LoginPage from "./LoginPage";
import Register from "./Register";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import loginImage from "../../assets/auth-image/loginpage.svg";
import registerImage from "../../assets/auth-image/register.svg";
import { Outlet, useLocation } from "react-router";

function Auth(props) {
  const { pathname } = useLocation();
  // console.log(pathname);
  const isLoginPage = pathname.indexOf("login") !== -1;

  return (
    <Box
      sx={{
        height: "100vh",
        width: 1,
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          zIndex: 9,
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingTop: 6,
          paddingRight: 5,
        }}
      >
        {isLoginPage ? (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Don’t have an account? {""}
            <Link
              underline={"none"}
              color={"#1bb48b"}
              fontWeight={700}
              component={RouterLink}
              to={"register"}
            >
              Sign up now
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Already have an account? {""}
            <Link
              underline={"none"}
              color={"#1bb48b"}
              fontWeight={700}
              component={RouterLink}
              to={"login"}
            >
              Login
            </Link>
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          pl: 3,
        }}
      >
        <Paper
          sx={{
            backgroundColor: "#E4F2E6",
            minWidth: "464px",
            width: "600px",
            height: "95vh",
            borderRadius: 4,
            marginX: "10px",
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
          }}
          elevation={1}
        >
          {isLoginPage ? (
            <img
              style={{ width: "80%", paddingBottom: "20px" }}
              src={loginImage}
            ></img>
          ) : (
            <img style={{ width: "80%" }} src={registerImage} />
          )}
        </Paper>
        <Box
          sx={{
            backgroundColor: "#fff",
            width: 1,
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Outlet />
          {/*<Register />*/}
          {/*<LoginPage />*/}
        </Box>
      </Box>
    </Box>
  );
}

export default Auth;
