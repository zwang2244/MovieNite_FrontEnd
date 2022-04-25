import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

function AuthInput({ name, control, label, onBlur }) {
  return (
    <Controller
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          onBlur={onBlur ? onBlur : () => {}}
          fullWidth
          error={!!error}
          helperText={error?.message}
          onChange={onChange}
          value={value}
          label={label}
          variant="outlined"
        />
      )}
      name={name}
      control={control}
    />
  );
}

export default AuthInput;
