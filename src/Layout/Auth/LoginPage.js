import React, { useState } from "react";
import { Box, FormGroup, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Email from "../../components/auth-form/auth-input";
import Password from "../../components/auth-form/password";
import AuthButton from "../../components/auth-form/auth-button";
import { useForm } from "react-hook-form";
import TitleAndDetail from "../../components/auth-form/TitleAndDetail";
import AuthInput from "../../components/auth-form/auth-input";
import * as passport from "../../api/passport";
import { loginLocal } from "../../utils/auth";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/lab";

const defaultValues = {
  emailAddr: "",
  loginToken: "",
};

const LoginSchema = Yup.object().shape({
  emailAddr: Yup.string().required("Email address required"),
  loginToken: Yup.string().required("Password required"),
});

function LoginPage(props) {
  const { setUser } = useAuth();
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: defaultValues,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  // console.log(errors);
  const onSubmit = (data) => {
    passport.login(data).then((res) => {
      if (res.code === 20002) {
        setShowError(true);
        setError("submitError", {
          message: "Wrong email or password, please try again.",
        });
        // console.log("Wrong Email");
      } else {
        const { user, isMember } = JSON.parse(res.data);
        user.isMember = isMember;

        loginLocal(JSON.stringify(user)).then(() => {
          setUser(user);
          navigate("/", { replace: true });
        });
      }
    });
  };
  return (
    <FormGroup
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "484px",
        height: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack direction={"column"} spacing={4}>
        <TitleAndDetail
          title={"Sign in"}
          detail={"To enjoy movies with your friends."}
        />

        {errors.submitError ? (
          <Alert sx={{ borderRadius: "10px" }} severity="error">
            Wrong email or password, please try again.
          </Alert>
        ) : null}

        <AuthInput
          label={"Email Address"}
          name={"emailAddr"}
          control={control}
        />
        <Password
          control={control}
          showPassword={showPassword}
          name={"loginToken"}
          label={"Password"}
          handleClickShowPassword={() => {
            setShowPassword(!showPassword);
          }}
        />
        <AuthButton>Login</AuthButton>
      </Stack>
    </FormGroup>
  );
}

export default LoginPage;
