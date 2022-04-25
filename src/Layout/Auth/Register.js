import React, { useState } from "react";
import { FormGroup, Stack } from "@mui/material";
import Password from "../../components/auth-form/password";
import AuthButton from "../../components/auth-form/auth-button";
import { useForm } from "react-hook-form";
import TitleAndDetail from "../../components/auth-form/TitleAndDetail";
import AuthInput from "../../components/auth-form/auth-input";
import { checkIfEmailExist, register } from "../../api/passport";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/lab";

const defaultValues = {
  emailAddr: "",
  loginToken: "",
  firstName: "",
  lastName: "",
};

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  emailAddr: Yup.string().required("Email address required"),
  loginToken: Yup.string().required("Password required"),
});

function Register(props) {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: defaultValues,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    register(data).then((res) => {
      if (res && res.code === 1) {
        navigate("/auth/login", { replace: true });
      }
    });
  };
  const checkEmailValid = () => {
    const emailAddr = watch("emailAddr");
    checkIfEmailExist(emailAddr).then((res) => {
      if (res?.code === 20001) {
        setIsEmailExists(true);
      } else {
        setIsEmailExists(false);
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
        <TitleAndDetail title={"Sign up"} detail={"Enter your details"} />
        <Stack direction={"row"} spacing={3} justifyContent={"center"}>
          <AuthInput
            label={"First Name"}
            name={"firstName"}
            control={control}
          />
          <AuthInput label={"Last Name"} name={"lastName"} control={control} />
        </Stack>
        {isEmailExists ? (
          <Alert sx={{ borderRadius: "10px" }} severity="error">
            This email already exists.
          </Alert>
        ) : null}
        <AuthInput
          onBlur={checkEmailValid}
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
        <AuthButton>Sign up</AuthButton>
      </Stack>
    </FormGroup>
  );
}

export default Register;
