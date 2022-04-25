import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

function Password({
  control,
  showPassword,
  name,
  label,
  handleClickShowPassword,
}) {
  return (
    <FormControl sx={{ m: 1, width: "1" }} variant="outlined">
      <Controller
        control={control}
        render={({
          formState: { errors },
          fieldState: { error },
          field: { onChange, value, name },
        }) => (
          <>
            <InputLabel error={!!error} htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              error={!!error}
              sx={{ borderRadius: "5px" }}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {!!errors && (
              <FormHelperText error id="accountId-error">
                {error?.message}
              </FormHelperText>
            )}
          </>
        )}
        name={name}
      />
    </FormControl>
  );
}

export default Password;
